import React from 'react';
import PropTypes from 'prop-types';

import { API_PLAYER } from '../services/APIPlayer';
// Componente criado por todos integrantes do grupo

class Login extends React.Component {
  state = {
    nameLogin: '',
    emailLogin: '',
    buttonLogin: true,
  };

  btnPlay = async () => {
    const { history } = this.props;
    const response = await API_PLAYER();
    const { token } = response;
    localStorage.setItem('token', token);
    history.push('/game');
  };

  validation = () => {
    const { nameLogin, emailLogin } = this.state;
    if (nameLogin && emailLogin) {
      this.setState({
        buttonLogin: false,
      });
    } else {
      this.setState({
        buttonLogin: true,
      });
    }
  };

  handleChange = async ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.validation);
  };

  render() {
    const { nameLogin, emailLogin, buttonLogin } = this.state;
    const { history } = this.props;
    return (
      <>
        <input
          name="nameLogin"
          type="text"
          placeholder="Nome"
          data-testid="input-player-name"
          value={ nameLogin }
          onChange={ this.handleChange }
        />
        <input
          name="emailLogin"
          type="email"
          placeholder="Email"
          data-testid="input-gravatar-email"
          value={ emailLogin }
          onChange={ this.handleChange }
        />
        <input
          type="button"
          value="Play"
          data-testid="btn-play"
          disabled={ buttonLogin }
          onClick={ this.btnPlay }
        />
        <input
          type="button"
          value="settings"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        />
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;

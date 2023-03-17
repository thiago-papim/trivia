import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { API_PLAYER } from '../services/APIPlayer';
import { loginAction } from '../redux/actions';
// Componente criado por todos integrantes do grupo

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    buttonLogin: true,
  };

  btnPlay = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    const response = await API_PLAYER();
    const { token } = response;
    localStorage.setItem('token', token);
    dispatch(loginAction({ name, email }));
    history.push('/game');
  };

  validation = () => {
    const { name, email } = this.state;
    if (name && email) {
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
    const { name, email, buttonLogin } = this.state;
    const { history } = this.props;
    return (
      <>
        <input
          name="name"
          type="text"
          placeholder="Nome"
          data-testid="input-player-name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          data-testid="input-gravatar-email"
          value={ email }
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
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null)(Login);

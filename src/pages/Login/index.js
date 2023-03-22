import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { API_PLAYER } from '../../services/APIPlayer';
import { loginAction } from '../../redux/actions';
import styles from './Login.module.css';

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

  btnSettings = () => {
    const { history } = this.props;
    history.push('/settings');
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
    return (
      <main className={ styles.login }>
        <div><img src="/assets/image/logo.png" alt="tivia logo" /></div>
        <div className={ styles.container }>
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
            className={ ` ${styles.btn} ${styles.play} ` }
            type="button"
            value="Play"
            data-testid="btn-play"
            disabled={ buttonLogin }
            onClick={ this.btnPlay }
          />
          <input
            className={ `${styles.btn} ${styles.settings}` }
            type="button"
            value="settings"
            data-testid="btn-settings"
            onClick={ this.btnSettings }
          />
        </div>
      </main>
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

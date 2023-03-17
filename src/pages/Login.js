import React from 'react';

// Componente criado por todos integrantes do grupo

class Login extends React.Component {
  state = {
    nameLogin: '',
    emailLogin: '',
    buttonLogin: true,
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

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.validation);
  };

  render() {
    const { nameLogin, emailLogin, buttonLogin } = this.state;
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
        />
      </>
    );
  }
}

export default Login;

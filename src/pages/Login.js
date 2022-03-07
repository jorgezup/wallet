import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../actions';

const minLength = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisable: true,
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    },
    this.validate);
  }

  isEmailValid = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }

  isPasswordValid = (password) => password.length >= minLength

  validate = () => {
    const { email, password } = this.state;
    if (this.isEmailValid(email) && this.isPasswordValid(password)) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  }

  handleSubmit = () => {
    const { email } = this.state;
    const { history, changeState } = this.props;

    changeState(email);

    history.push('/carteira');
  }

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <div>
        <header>
          <h1>TRYBE Wallet</h1>
          <p>Sua carteira digital</p>
        </header>
        <form action="">
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
          <button
            type="button"
            onClick={ this.handleSubmit }
            disabled={ isDisable }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeState: (state) => dispatch(userLogin(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  changeState: PropTypes.func.isRequired,
};

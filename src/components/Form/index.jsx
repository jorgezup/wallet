import React, { Component } from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import { newExpense as addExpense } from '../../actions';
import { getCurrenciesCode, getRates } from '../../api';

const INITIAL_STATE = {
  value: '',
  currency: '',
  method: '',
  tag: '',
  description: '',
};

class Form extends Component {
  state = {
    ...INITIAL_STATE,
    currencies: [],
  };

  async componentDidMount() {
    const currencies = await this.fetchAPI();
    this.setState({
      currencies,
    });
  }

  fetchAPI = () => getCurrenciesCode()

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  setValuesDefault = () => {
    this.setState(
      INITIAL_STATE,
    );
  }

  setExpenses = async () => {
    const { newExpense, wallet: { expenses } } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const expenseObj = {
      id: !expenses.length ? 0 : expenses.length,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: await getRates(),
    };
    await newExpense(expenseObj);
  }

  handleSubmit = () => {
    this.setExpenses();
    this.setValuesDefault();
  }

  render() {
    const {
      value,
      currency,
      method,
      tag,
      description,
      currencies,
    } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {
              currencies.map((code, index) => (
                <option value={ code } key={ index }>
                  {code}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa

        </button>
      </form>
    );
  }
}

Form.propTypes = {
  newExpense: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    expenses: arrayOf(Object),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  newExpense: (state) => dispatch(addExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

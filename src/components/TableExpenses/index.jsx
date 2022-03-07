import React, { Component } from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import { connect } from 'react-redux';

class TableExpenses extends Component {
  calculatedValue = (value, currency) => {
    const total = Number(value) * Number(currency);
    return total.toFixed(2);
  }

  render() {
    const { wallet: { expenses } } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses?.map((expense, index) => {
              const exchangeCurrencyValue = expense.exchangeRates[expense.currency].ask;
              return (
                <tr key={ index }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{(Number(expense.value)).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>{Number(exchangeCurrencyValue).toFixed(2)}</td>
                  <td>{this.calculatedValue(expense.value, exchangeCurrencyValue)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                    >
                      Editar

                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                    >
                      Excluir

                    </button>
                  </td>
                </tr>

              );
            })
          }
        </tbody>
      </table>
    );
  }
}

TableExpenses.propTypes = {
  wallet: PropTypes.shape({
    expenses: arrayOf(Object),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps, null)(TableExpenses);

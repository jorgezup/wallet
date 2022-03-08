import React, { Component } from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../../actions/wallet';

class TableExpenses extends Component {
  handleRemove = (id) => {
    const { removeExpenseDispatch } = this.props;
    removeExpenseDispatch(id);
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
            expenses?.map((expense) => {
              const exchangeCurrency = expense.exchangeRates[expense.currency].ask;
              const calculatedValue = Number(expense.value) * Number(exchangeCurrency);
              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{(Number(expense.value)).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>{Number(exchangeCurrency).toFixed(2)}</td>
                  <td>{(calculatedValue).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      // data-testid="edit-btn"
                    >
                      Editar

                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.handleRemove(expense.id) }
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
  removeExpenseDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenseDispatch: (id) => dispatch(removeExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);

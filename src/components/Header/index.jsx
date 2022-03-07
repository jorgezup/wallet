import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpense = (expenses) => expenses.reduce((acc, expense) => {
    const filteredCurrency = expense.exchangeRates[expense.currency];
    const askValue = filteredCurrency.ask;
    const calculatedValue = Number(expense.value) * Number(askValue);
    acc += calculatedValue;
    return acc;
  }, 0)

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <div>
          <span>Email: </span>
          <span data-testid="email-field">{email}</span>
        </div>
        <div>
          <span>Despesa total: </span>
          <span data-testid="total-field">{this.totalExpense(expenses)?.toFixed(2)}</span>
        </div>
        <div>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>

    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);

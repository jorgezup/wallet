import React from 'react';
import Form from '../components/Form';
import TableExpenses from '../components/TableExpenses';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Form />
        <TableExpenses />
      </>
    );
  }
}

export default Wallet;

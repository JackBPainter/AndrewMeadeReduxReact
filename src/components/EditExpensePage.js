import React from 'react';
import { connect } from 'react-redux'
import { editExpense, removeExpense } from '../actions/expenses'

import ExpenseForm from './ExpenseForm'

const EditExpensePage = (props) => {
  console.log(props)

  const onClickHandler = () => {
    props.dispatch(removeExpense(props.expense.id))
    props.history.push('/')
  }

  return (
    <div>
      <ExpenseForm 
        expense={props.expense}
        onSubmit={(expense) => {
          props.dispatch(editExpense(props.expense.id, expense))
          props.history.push('/')
          console.log('updated', expense)
        }}
      />
      <button onClick={() => onClickHandler()}>Remove</button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  }
}

export default connect(mapStateToProps)(EditExpensePage);

import React from "react";
import { connect } from "react-redux";
import { removeExpense } from "../actions/expenses";

const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => {
  console.log(dispatch)
  console.log(id)

  return (
    <div>
      <div>{description}</div>
      <div>{amount}</div>
      <div>{createdAt}</div>
      <button onClick={() => dispatch(removeExpense({ id }))}>Remove</button>
    </div>
  );
};

export default connect()(ExpenseListItem);

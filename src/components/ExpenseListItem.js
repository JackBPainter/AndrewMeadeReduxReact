import React from "react";
import { Link } from "react-router-dom"

const ExpenseListItem = ({ description, amount, createdAt, id }) => {
  return (
    <div>
      <Link to={`/edit/${id}`}>
        <div>{description}</div>
      </Link>
      <div>{amount}</div>
      <div>{createdAt}</div>
    </div>
  );
};

export default ExpenseListItem;

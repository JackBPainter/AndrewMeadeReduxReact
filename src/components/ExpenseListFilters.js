import React, { useState } from "react";
import { connect } from "react-redux";
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../actions/filters";

import { DateRangePicker } from "react-dates";

const ExpenseListFilters = (props) => {
  const [calenderFocused, setCalenderFocused] = useState(null)

  const onDatesChange = ({ startDate, endDate }) => {
    props.dispatch(setStartDate(startDate))
    props.dispatch(setEndDate(endDate))
  }

  const onFocusChange = (calenderFocused) => {
    setCalenderFocused(calenderFocused)
  }

  return (
    <div>
      <input
        type="text"
        value={props.filters.text}
        onChange={(e) => {
          props.dispatch(setTextFilter(e.target.value));
        }}
      />
      <select
        value={props.filters.sortBy}
        onChange={(e) => {
          if (e.target.value === "date") {
            props.dispatch(sortByDate());
          } else if (e.target.value === "amount") {
            props.dispatch(sortByAmount());
          }
        }}
      >
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
      <DateRangePicker 
        startDate={props.filters.startDate}
        endDate={props.filters.endDate}
        onDatesChange={onDatesChange}
        focusedInput={calenderFocused}
        onFocusChange={onFocusChange}
        showClearDates={true}
        numberOfMonths={1}
        isOutsideRange={() => false}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);

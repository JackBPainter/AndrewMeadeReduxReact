import React, { useState } from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

const ExpenseForm = (props) => {
    const [description, setDescription] = useState(props.expense ? props.expense.description : '')
    const [note, setNote] = useState(props.expense ? props.expense.note : '')
    const [amount, setAmount] = useState(props.expense ? (props.expense.amount / 100).toString() : '')
    const [createdAt, setCreatedAt] = useState(props.expense ? moment(props.expense.createdAt) : moment())
    const [calenderFocus, setCalenderFocus] = useState(false)
    const [error, setError] = useState('')
    
    const onAmountChange = (e) => {
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setAmount(e.target.value)
        }
    }

    const onDateChange = (date) => {
        console.log(date)
        if(createdAt) {
            setCreatedAt(date)
        }
    }

    const onFocusChange = ({ focused }) => {
        setCalenderFocus(focused)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(!description || !amount) {
            setError("ERROR, please provide a deescription and amount")
        } else {
            setError('')
            props.onSubmit({
                description,
                amount: parseFloat(amount, 10) * 100,
                createdAt: createdAt._d.valueOf(),
                note
            })
        }
    }

    return (
        <div>
            {error ? 
                <div>{error}</div> : 
                null
            }
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoFocus
                />
                <input 
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={onAmountChange}
                />
                <SingleDatePicker 
                    date={createdAt}
                    onDateChange={onDateChange}
                    focused={calenderFocus}
                    onFocusChange={onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    placeholder="Add a note for your expense (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                >
                </textarea>
                <button>Add Expense</button>
            </form>
        </div>
    )
}

export default ExpenseForm
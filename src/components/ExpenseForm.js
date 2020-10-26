import React, { useState } from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

const now = moment()
console.log(now.format("MMM, Do, YYYY"))

const ExpenseForm = () => {
    const [description, setDescription] = useState('')
    const [note, setNote] = useState('')
    const [amount, setAmount] = useState('')
    const [createdAt, setCreatedAt] = useState(moment())
    const [calenderFocus, setCalenderFocus] = useState(false)

    console.log(createdAt)

    const onAmountChange = (e) => {
        if(amount.match(/^\d*(\.\d{0,2})?$/)) {
            setAmount(e.target.value)
        }
    }

    const onDateChange = (createdAt) => {
        setCreatedAt(() => ({ moment: createdAt }))
    }

    const onFocusChange = ({ focused }) => {
        setCalenderFocus(focused)
    }

    return (
        <div>
            <form>
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
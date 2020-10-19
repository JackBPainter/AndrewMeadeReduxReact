import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// ADD_EXPENSE
const addExpense = ({ id = '', description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: "ADD_EXPENSE",
    expense: {
        id,
        description,
        note,
        amount,
        createdAt
    }
})

// REMOVE_EXPENSE 
const removeExpense = ({ id } = {}) => ({
    type: "REMOVE_EXPENSE",
    id
})

// Expenses Reducer

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return state.concat(action.expense)
        case "REMOVE_EXPENSE":
            return state.filter(expense => expense.id !== action.id)
        default:
            return state
    }
}

// Filters Reducer

// SET_TEXT_FILTER

const setTextFilter = (text = '') => ({
    type: "SET_TEXT_FILTER",
    text
})

const sortByAmount = (amount = 'amount') => ({
    type: "SORT_BY_AMOUNT",
    amount
})

const sortByDate = (date = 'date') => ({
    type: "SORT_BY_DATE",
    date
})

const setStartDate = (date = undefined) => ({
    type: "SET_START_DATE",
    date
})

const setEndDate = (date = undefined) => ({
    type: "SET_END_DATE",
    date
})

const filtersReducerDefaultState = { 
    text: '', 
    sortBy: 'date', 
    startDate: undefined, 
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return {...state, text: action.text}
        case "SORT_BY_AMOUNT":
            return {...state, sortBy: action.amount}
        case "SORT_BY_DATE":
            return {...state, sortBy: action.date} 
        case "SET_START_DATE":
            return {...state, startDate: action.date}
        case "SET_END_DATE":
            return {...state, endDate: action.date}
        default: 
            return state
    }
}

// Get visible expenses 
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
}

// Store Creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({ description: "Rent", amount: 100, id: '90129124' }))
const expenseTwo = store.dispatch(addExpense({ description: "Mortgage", amount: 100000, id: '90899124' }))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))

// store.dispatch(setTextFilter('rent'))

// store.dispatch(setTextFilter('rent'))
// store.dispatch(setTextFilter(''))

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

store.dispatch(setStartDate(125))
store.dispatch(setStartDate())
store.dispatch(setEndDate(1250))

const demoState = {
    expenses: [{
        id: '982375',
        desc: 'Lunch',
        note: 'Business lunch',
        amount: '£25',
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
}

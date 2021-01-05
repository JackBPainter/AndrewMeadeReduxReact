import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('Should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toStrictEqual([])
})

test('Should remove expense by id', () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action) 
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('Should not remove expense if no id is found', () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: '-1'
    }
    const state = expensesReducer(expenses, action) 
    expect(state).toEqual(expenses)
})

test('Should add an expense', () => {
    const expense = {
        id: '4',
        description: 'New Expense',
        note: '',
        amount: 420,
        createdAt: -10000
    }
    const action = {
        type: "ADD_EXPENSE",
        expense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([...expenses, newExpense])
})

test('Should edit an expense', () => {
    const action = {
        type: "EDIT_EXPENSE",
        id: expenses[1].id,
        updates: {
            note: 'This has been edited'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state[1].note).toBe('This has been edited')
})

test('Should not edit expense if expense not found', () => {
    const action = {
        type: "EDIT_EXPENSE",
        id: 2,
        updates: {
            note: 'This has been edited'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})
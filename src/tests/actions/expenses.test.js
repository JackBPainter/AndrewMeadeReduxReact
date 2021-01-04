import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

test('Should setup remove expense action object', () => {
    const action = removeExpense('123abc')
    expect(action).toEqual({ 
        type: 'REMOVE_EXPENSE',
        id: '123abc' 
    })
})

test('Should setup edit expense action object', () => {
    const action = editExpense('123abc', 'Updated expense')
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: 'Updated expense'
    })
})

test('Should setup add expense action object', () => {
    const expenseData = {
        description: 'Rent',
        amount: 10500,
        createdAt: 1000,
        note: 'This was last months rent'
    }
    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

test('Should setup add expense action object when using defaults', () => {
    const defaultData = {
        description: '', 
        note: '', 
        amount: 0, 
        createdAt: 0 
    }
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...defaultData,
            id: expect.any(String)
        }
    })
})
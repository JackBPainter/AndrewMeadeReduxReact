import { createStore } from 'redux'

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: "INCREMENT",
    incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: "DECREMENT",
    decrementBy
})

const setCount = ({ set = 500 } = {}) => ({
    type: "SET",
    set
})

const resetCount = () => ({
    type: "RESET",
})

// Reducers

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT': 
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }   
        case 'SET':
            return {
                count: action.set
            }        
        case 'RESET':
            return {
                count: 0
            }        
        default:
            return state;
    }
};

const store = createStore(countReducer)

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(incrementCount({ incrementBy: 5 }))
store.dispatch(incrementCount({ incrementBy: 25 }))

store.dispatch(decrementCount({ decrementBy: 10 }))
store.dispatch(decrementCount({ decrementBy: 30 }))

store.dispatch(resetCount())
store.dispatch(setCount({ set: 101 }))


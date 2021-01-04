
export const setTextFilter = (text = '') => ({
    type: "SET_TEXT_FILTER",
    text
})

export const sortByAmount = (amount = 'amount') => ({
    type: "SORT_BY_AMOUNT",
    amount
})

export const sortByDate = (date = 'date') => ({
    type: "SORT_BY_DATE",
    date
})

export const setStartDate = (date) => ({
    type: "SET_START_DATE",
    date
})

export const setEndDate = (date) => ({
    type: "SET_END_DATE",
    date
})
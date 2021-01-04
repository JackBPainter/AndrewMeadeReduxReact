const add = (a, b) => a + b 
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`

test('This test should add two numbers', () => {
    const result = add(1, 4)
    expect(result).toBe(5)
})

test('This test should generate greeting with users name', () => {
    const result = generateGreeting('John')
    expect(result).toBe('Hello John!')
})

test('This test should generate greeting with default name', () => {
    const result = generateGreeting()
    expect(result).toBe('Hello Anonymous!')
})
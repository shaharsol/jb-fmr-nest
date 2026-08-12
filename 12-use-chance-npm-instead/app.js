const password = chance.string({ 
    pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    length: 10
})

console.log(`password is ${password}`)
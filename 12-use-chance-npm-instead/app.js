const Chance = require('chance')
const chance = new Chance()

const password = chance.string({ 
    pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    length: 10
})

console.log(`password is ${password}`)
const { generatePassword } = require('./password-generator') 

console.log(generatePassword(10, true))
console.log(generatePassword(10))
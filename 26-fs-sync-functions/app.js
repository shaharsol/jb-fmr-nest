const { readFileSync } = require('fs')

const data = readFileSync('sample.txt')

console.log(data.toString())
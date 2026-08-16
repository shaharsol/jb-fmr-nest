// read the file contents
// duplicate it
// and save to file
const { readFile } = require('fs')

readFile('./sample.txt', (err, data) => {
    if (err) {
        console.log('there was an error', err)
    } else {
        console.log('the data in the file is', data.toString())
    }
})

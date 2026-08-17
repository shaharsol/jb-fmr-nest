// read the file contents
// duplicate it
// and save to file
const { readFile } = require('fs')

const readFilePromise = (path) => {
    // promise is a mechanism to allow
    // consumption of async operations
    // in a more friendly way
    // a promise can be either:
    // - pending
    // - fulfilled
    // - rejected
    return new Promise((resolve, reject) => {
        readFile(path, (err, data) => {
            if (err) {
                reject(err) // when i want to raise an exception in the consumer
            } else {
                resolve(data.toString()) // when i want to provide the consumer with the result data
            }
        })
    })    

}

const promise = readFilePromise('./sample.txt')
promise
    .then((data) => { console.log('data from readFilePromise', data) }) // this is the callback that will be invoked in a promise resolve
    .catch((err) => { console.log('there was an error', err) }) // this is the callback that will be invoked in a promise reject


    
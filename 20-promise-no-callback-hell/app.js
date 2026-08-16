const { readFile, writeFile } = require('fs')

// to take a callback oriented function
// and wrap it in a promise
// we call: promisification
const readFilePromise = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })    
}

const writeFilePromise = (path, data) => {
    return new Promise((resolve, reject) => {
        writeFile(path, data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })   
}

// this style of async coding using concatenating then functions
// was introduced in 2015 and was doubted as thenification
// and helped prevent callback hell
readFilePromise('./sample.txt')
    .then(data => writeFilePromise('./sample.txt', data + data))
    .then(data => console.log('this is the data returned from the write op', data))
    .catch(err => console.log('err: ', err))



// i can't use writeFile here, becasue i won't have the input that i need (the file contents)
// writeFile()
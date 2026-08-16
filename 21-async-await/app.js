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

// async/await is a syntax layer on top of promise
// whats important to understand in async js is:
// ALL async operation are done callback
// callbacks are wrapped inside promises
// and aysnc/await is a syntax layer based on promises
// so also if i use async/await there are promises
// involved, and therefore there are callbacks
// under the hood

// readFilePromise('./sample.txt')
//     .then(data => writeFilePromise('./sample.txt', data + data))
//     .then(data => console.log('this is the data returned from the write op', data))
//     .catch(err => console.log('err: ', err))


// the await function is to assign a value for a resolved promise
const main = async () => {
    try {
        const data = await readFilePromise('./sample.txt')
        await writeFilePromise('./sample.txt', data + data)
        console.log('write successful')
    } catch (e) {
        console.log('error: ', e)
    }
}

main()



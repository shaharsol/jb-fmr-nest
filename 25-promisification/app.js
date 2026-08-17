const { readFile, writeFile, mkdir, unlink, rmdir } = require('fs')
// i can always use the formal promisify func instead of writing my own
const { promisify } = require('util')

// even faster, import the promisified version from the fs/promises
const { readFile } = require('fs/promises')

// const readFilePromise = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data.toString())
//             }
//         })
//     })    
// }

// const writeFilePromise = (path, data) => {
//     return new Promise((resolve, reject) => {
//         writeFile(path, data, (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data)
//             }
//         })
//     })   
// }

// build this func
const promisify = (func) => {
    return async (...args) => {
        return new Promise((resolve, reject) => {
            func(...args, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}

const mkdirPromise = promisify(mkdir)
const readFilePromise = promisify(readFile)
const writeFilePromise = promisify(writeFile);

(async() => {
    const data = await readFilePromise('./sample.txt')
    await mkdirPromise('testfolder')
    await writeFilePromise('./testfolder/sample.txt', data + data)
})()

// the task:
// read the file data
// and save a file with data+data in a new folder
// await readFilePromise
// await mkdir
// await writeFilePromise
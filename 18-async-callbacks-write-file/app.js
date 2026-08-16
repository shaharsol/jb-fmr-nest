const { readFile, writeFile } = require('fs')

const writeFileTamir = (path, data) => {
    writeFile(path, data, (err, data) => {
        if (err) {
            console.log('there was error in writing the file', err)
        } else {
            console.log('file was saved')
        }
    })
}

readFile('./sample.txt', (err, data) => {
    if (err) {
        console.log('there was an error', err)
    } else {
        console.log('the data in the file is', data.toString())
        const newData = data + data
        writeFile('./sample.txt', newData, (err, data) => {
            if (err) {
                console.log('there was error in writing the file', err)
            } else {
                console.log('file was saved')
            }
        })
    }
})

writeFileTamir('./sample.txt', '')
// i can't use writeFile here, becasue i won't have the input that i need (the file contents)
// writeFile()
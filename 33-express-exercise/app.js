const express = require('express')
const axios = require('axios')
const { toXML } = require('jstoxml')

const app = express()

app.get('/', async (request, response, next) => {

    // get the users 
    const res = await axios('https://dummyjson.com/users')
    const { users } = res.data
    
    // filter users
    const filtered = request.query.filter ? users.filter(user => user.firstName.includes(request.query.filter)) : [...users]
    
    // format response
    if (request.query.format === 'xml') {
        response.setHeader('Content-Type', 'application/xml')
        response.send(toXML(filtered))
    } else {
        response.json(filtered)
    }
})

app.listen(3000, () => { console.log('started...') })
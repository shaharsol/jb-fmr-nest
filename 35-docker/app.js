const express = require('express')
const axios = require('axios')
const { toXML } = require('jstoxml')

const app = express()

const loadUsers = async (request, response, next) => {
    const res = await axios('https://dummyjson.com/users')
    const { users } = res.data
    request.users = users
    next()
}




const filterUsers = async (request, response, next) => {
    request.filtered = request.query.filter ? request.users.filter(user => user.firstName.includes(request.query.filter)) : [...request.users]
    next()
}

const respond = async (request, response) => {
    if (request.query.format === 'xml') {
        response.setHeader('Content-Type', 'application/xml')
        response.send(toXML(request.filtered))
    } else {
        response.json(request.filtered)
    }
}

app.get('/', loadUsers, filterUsers, respond)


app.listen(3000, () => { console.log('started...') })
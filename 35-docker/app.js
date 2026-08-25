const express = require('express')
const axios = require('axios')
const { toXML } = require('jstoxml')
const mysql = require('mysql2')

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


const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'college'
})

connection.connect(function(err) {
    if(err) console.log('error connecting to db', err)
    else console.log('connected to db')
})

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`started on port ${port}...`) })

// 
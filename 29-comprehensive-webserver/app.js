const { createServer } = require('http')

const port = process.env.PORT || 3000

const products = [{
    id: 1,
    name: 'iphone'
}, {
    id: 2,
    name: 'Samsung galaxy'
}, {
    id: 3,
    name: 'Shiomi phone'
}]

const requestHandler = (request, response) => { 

    // the server needs to be able to respond to the following endpoints:
    // GET /health should retrun "healthy"
    // GET /products should return a json of the products

}

const server = createServer(requestHandler)

server.listen(port, () => { console.log(`server started on port ${port}`) })
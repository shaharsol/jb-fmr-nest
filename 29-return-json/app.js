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

const users = `id,name,age
1,moshe,33
2,yafit,29
3,ido,55
`

const requestHandler = (request, response) => { 

    // the server needs to be able to respond to the following endpoints:
    // GET /health should retrun "healthy"
    // GET /products should return a json of the products
    switch(request.url) {
        case '/health':
            response.end('healthy')
            break
        case '/products':
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(products))
            break
        case '/users':
            // return users as csv
            // when the user comes from browser, the browser should download the csv file...

    }

}

const server = createServer(requestHandler)

server.listen(port, () => { console.log(`server started on port ${port}`) })
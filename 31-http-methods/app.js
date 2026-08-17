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

const requestHandler = async (request, response) => { 

    switch(request.url) {
        case '/health':
            response.end('healthy')
            break
        case '/products':
            switch (request.method) {
                case 'GET':
                    response.setHeader('Content-Type', 'application/json')
                    // const products = await getProductsFromDB()
                    response.end(JSON.stringify(products))
                    break
                case 'POST':
                    response.writeHead(201)
                    response.end('saved product...')
                    break
                default:
                    response.writeHead(405)
                    response.end('method not allowed')

            }
            break
        case '/users':
            switch (request.method) {
                case 'GET':
                    response.setHeader('Content-Type', 'text/csv')
                    response.end(users)
                    break;
                case 'POST':
                    response.writeHead(204)
                    response.end('saved user...')
                    break
                default:
                    response.writeHead(405)
                    response.end('method not allowed')
            }
            break
        default: 
            response.writeHead(404)
            response.end('the page u requested was not found on this server bro')
    }

}

const server = createServer(requestHandler)

server.listen(port, () => { console.log(`server started on port ${port}`) })
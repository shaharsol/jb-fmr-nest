const { createServer } = require('http')

const port = process.env.PORT || 3000

const requestHandler = (request, response) => { 

    // here i can investigate the request object
    // and realize what i am asked to do.

    response.end('<h1>welcome to Nodejs</h1>') 
}

const server = createServer(requestHandler)

server.listen(port, () => { console.log(`server started on port ${port}`) })
import axios from 'axios'

interface User {
    id: number,
    title: string,
    address: {
        street: number
    }
}

(async() => {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
    const users: User[] = response.data
    console.log(users[0]?.address.street)
})()
interface Product {
    id: number
    name: string
    price: number
}

interface Employee {
    id: number
    name: string
    salary: number
}

const database = {
    products: [{
        id: 1, 
        name: 'laptop',
        price: 1000
    }],
    employees: [{
        id: 2,
        name: 'moshe',
        salary: 1000
    }]
}

function getFromDatabase<T>(id: number): T | undefined  {
    const product = database.products.find(p => p.id === id)
    if (product) return product as T
    const employee = database.employees.find(e => e.id === id)
    if (employee) return employee as T
    return undefined
}

const someProduct = getFromDatabase<Product>(1)
const someEmployee = getFromDatabase<Employee>(2)

someEmployee?.salary
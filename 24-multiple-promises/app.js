const axios = require('axios');

const getUsers = async () => {
    const response = await axios('https://dummyjson.com/users')
    return response.data
}

const getProducts = async () => {
    const response = await axios('https://dummyjson.com/products')
    return response.data
}

const getRecipes = async () => {
    const response = await axios('https://dummyjson.com/recippes')
    return response.data
}

(async () => {

    // I want to run these 3 promises without having to await each one
    // to resolve since the "consecutive" promise, does not require
    // any data resolved from the "previous" promise
    // const users = await getUsers()
    // const products = await getProducts()
    // const recipes = await getRecipes()
    // console.log(`users count is ${users.users.length}`)
    // console.log(`products count is ${products.products.length}`)
    // console.log(`recipes count is ${recipes.recipes.length}`)


    // Promise.all vs Promise.allSettled
    // Promise.all will try to resolve all promises, 
    // but will fail the entire op on 1st rejection.
    // Promise.allSettled will wait for resolution of
    // all promises, weather they fullfill or reject

    try {
        // const results = await Promise.allSettled([
        const results = await Promise.all([
            getUsers(),
            getProducts(),
            getRecipes()
        ])

        console.log(results)

    } catch (e) {

        console.log(e.message)
    }


})()

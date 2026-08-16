const generatePassword = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'   
    let password = ''
    for(let i = 0 ; i < length; i++) {
        const randChar = chars[Math.floor(Math.random() * chars.length)]
        password = `${password}${randChar}`
    }
    return password
}

module.exports = {
    generatePassword
}

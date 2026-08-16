const generatePassword = (length, useSpecialChars = false) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const specialChars = '!@#$%^&*()'  
    
    const charsToUse = useSpecialChars ? chars + specialChars : chars
    let password = ''
    for(let i = 0 ; i < length; i++) {
        const randChar = charsToUse[Math.floor(Math.random() * charsToUse.length)]
        password = `${password}${randChar}`
    }
    return password
}

module.exports = {
    generatePassword
}

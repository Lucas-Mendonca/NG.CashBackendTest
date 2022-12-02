export function checkIfPassowordIsValidy(password: string):boolean {
    if(!password) {
        return false
    }

    if(typeof password !== 'string'){
        return false
    }

    if(password.length < 8) {
        return false
    }

    if(!password.match('[A-Z]')) {
        return false
    }
    
    return true 
}
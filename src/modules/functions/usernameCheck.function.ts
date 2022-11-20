export function checkIfUsernameIsValidy(username: any):boolean {
    if (username.length < 3) { 
        return false
    };

    if (!username) { 
        return false
    };

    if(typeof username !== 'string') {
        return false
    }

    return true
}
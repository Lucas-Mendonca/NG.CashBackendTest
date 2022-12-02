if(!process.env.TOKEN_SECRET_HASH){
    throw new Error('Could not get "TOKEN_SECRET_HASH" value')
}

const tokenSecretHash:string = process.env.TOKEN_SECRET_HASH

export default tokenSecretHash
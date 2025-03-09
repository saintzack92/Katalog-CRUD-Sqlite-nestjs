import * as bcrypt from 'bcrypt'

// const SALT=10

export async function encodePassword(rawPassword:string) {
    const SALT = await bcrypt.genSalt()
    return bcrypt.hashSync(rawPassword,SALT)
}

export async function comparePasswords(rawPassword:string, hash:string):Promise<Boolean>{
    return bcrypt.compare(rawPassword,hash)
}
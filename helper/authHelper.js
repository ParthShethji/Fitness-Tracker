import bcrypt from 'bcrypt'

export const hashPasswod = async (password)=>{
    try {
        const saltrounds = 10
        const hashed = await bcrypt.hash(password, saltrounds)
        return hashed
    } catch (error) {
        console.log(error)
    }
}

export const compare = async (password, hashedpassword) =>{
    return(bcrypt.compare(password, hashedpassword))
}
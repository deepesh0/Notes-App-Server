import bycrypt from 'bycrypt'

export const hashPassword =async(password)=>{
    try {
        const salt = await bycrypt.genSalt (10)
        return await bycrypt.hash(password, salt)
        
    } catch (error) {
        console.log(error)
        
    }
}
export const comparePassword =async(password, hash)=>{
    try {
        return await bycrypt.compare(password, hash)
        
    } catch (error) {
        console.log(error)
    }
}
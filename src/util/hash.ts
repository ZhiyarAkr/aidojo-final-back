import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken"

const saltRounds = 14
const hash = async (plainText: string) => {
    const hashedValue = await bcrypt.hash(plainText, saltRounds);
    return hashedValue;
}

const verify =async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}

const accessTokenSecretKey = "the-very-secret-key-that-should-never-be-leaked";

const generateToken = (payload: object) => {
    return jwt.sign(payload, accessTokenSecretKey);
}

export {hash, verify, generateToken};
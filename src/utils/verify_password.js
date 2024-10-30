import bcrypt from 'bcrypt'

export const isPasswordCorrect = (password,encryptedPassword) => {
    return bcrypt.compare(password,encryptedPassword)
}
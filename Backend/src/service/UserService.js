const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")

const createUser = (newUser) =>{
    return new Promise( async (resolve, reject) =>{
        const { name, email, password, confirmPassword, phone } = newUser
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser != null){
                resolve({
                    status: 'OK',
                    massage: 'The email already exist'
                })
            }
            const hash = await bcrypt.hash(password.toString(), 10)
            console.log(hash)
            const createdUser = await User.create({
                name,
                email,
                password : hash, 
                phone
            })
            if(createdUser){
                resolve({
                    status: 'OK',
                    message: 'Your account is created',
                    data: createdUser
                })
            }
        } catch(e){
            reject(e)
        }
    })
}
const loginUser = (userLogin) =>{
    return new Promise( async (resolve, reject) =>{
        const {email, password} = userLogin
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser == null){
                resolve({
                    status: 'OK',
                    massage: 'Email or Password not correct'
                })
            }
            const comparePassword = await bcrypt.compare(password, checkUser.password)
            if(!comparePassword){
                resolve({
                    status: 'OK',
                    massage: 'Email or Password not correct'
                })
            }
            const access_token =  await generalAccessToken({
                id : checkUser.id,
                isAdmin : checkUser.isAdmin
            })
            
            const refresh_token = await generalRefreshToken({
                id : checkUser.id,
                isAdmin : checkUser.isAdmin
            })

            resolve({
                status: 'OK',
                massage: 'Login success',
                access_token,
                refresh_token
            })
        } catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser
}
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try{
        const{name,email,password} = req.body
        if(password.length<6)
            return res.status(400).json({success:false, message:"Password must be at least 6 characters"})
        const emailLowerCase1 = email.toLowerCase()
        const existedUser = await User.findOne({email:emailLowerCase1})
        if(existedUser)
            return res.status(400).json({success:false, message:"Email already exist"})

        const hashedPassword = await bcrypt.hash(password,12)
        const user = await User.create({
            name, email:emailLowerCase1, password:hashedPassword
        })
        const{_id:id,photoURL} = user
        const token = jwt.sign({id, email, name, photoURL}, process.env.JWT_SECRET_KEY, {expiresIn:'2h'})
        res.status(201).json({success:true, result:{id, email:user.email, name, photoURL, token}})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:"Internal server error"})

    }
}
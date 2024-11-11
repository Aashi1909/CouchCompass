import bcrypt from 'bcrypt'
import User from '../models/User'

export register = async (req, res) => {
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
        }
    }catch(error){

    }
}
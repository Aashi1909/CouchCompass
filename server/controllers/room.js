import Room from '../models/Room.js';

export const createRoom = async (req, res) => {
    try{
        const {id:uid, name:uName, photoURL:uPhoto} = req.user

        const newRoom = new Room({...req.body, uid, uName, uPhoto})
        await newRoom.save()
        res.status(201).json({success: true, result: newRoom})
        }  
    catch(error){
        res.status(500).json({success:false, message:"Internal server error"})
    }  
}

export const getRooms = async(req, res) => {
    try{
        const rooms = await Room.find().sort({_id:-1})
        res.status(200).json({success: true, result: rooms})
        
    }catch(error){
        res.status(500).json({success:false, message:"Internal server error"})
    }
}
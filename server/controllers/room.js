export const createRoom = async (req, res) => {
    try{
        const {id:uid, name:uName, photoURL:uPhoto} = req.user
        const newRoom = new Room({...req.body, uid, uName, uPhoto})
        await newRoom.save()
        res.status(201).json({success: true, result: newRoom})
        }  
    catch(error){
        console.log(error)
        res.status(500).json({success:false, message:"Internal server error"})

    }  

}
const tryCatch = (controller) =>
{
    return async (req, res) => {
        try {
            await controller(req, res)
        } catch(error){
            console.log(error)
            res.status(500).json({success:false, message:"Internal server error"})
    
        }
    }
}
export default tryCatch
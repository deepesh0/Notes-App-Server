import cloudinary from 'cloudinary'
import fs from fs

export const upload = async(file, dir)=>{
    try {
         const folder = '/Notes app' + dir
         const {path, public_id} = await cloudinary.uploader.upload(file,{
        folder,
        unique_filename:true
    })
    if(fs.existsSync(file)){
        (fs.unlinkSync(file))
    }
return({
    path:secure_url,
    public_id
})
        
    } catch (error) {
        console.log(error,'Image Upload Error')
        
    } 
}
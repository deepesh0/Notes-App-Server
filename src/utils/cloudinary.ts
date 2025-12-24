
import fs from "fs";
import cloudinary from "../config/cloudinary.config";


export const upload = async (file: string, dir: string) => {
  try {
    const folder = "/Notes app" + dir;
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file,
      {
        folder,
        unique_filename: true,
      }
    );
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
    return {
      secure_url,
      public_id
    };
  } catch (error) {
    console.log(error, "Image Upload Error");
  }
};

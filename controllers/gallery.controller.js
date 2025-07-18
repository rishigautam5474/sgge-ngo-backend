import Gallery from "../models/gallery.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const galleryController = async (req, res) => {
    const gallery = await Gallery.find({});

    if(!gallery) {
        return res.status(404).json({error: true, success: false, message: "Gallery not found"})
    }

    return res.status(200).json({error: false, success: true, message: "Gallery find", gallery})
}

const addGallery = async (req, res) => {
    const {mediaType} = req?.body;
    const imageLocalPath = req?.files?.mediaUrl[0]?.path;

    if(!imageLocalPath) {
        return res.status(400).json({error: true, success: false, message: "Image file is required"})
    }

    const imageCloudinary = await uploadOnCloudinary(imageLocalPath);

    if(!imageCloudinary) {
        return res.status(400).json({error: true, success: false, message: "Image file is required"})
    }

    const gallery = await Gallery.create({
    mediaUrl: imageCloudinary.url,
    mediaType
  });

    return res.status(201).json({
    error: false,
    success: true,
    message: "Successfully picture is added",
    gallery,
  });

}

export {galleryController, addGallery}
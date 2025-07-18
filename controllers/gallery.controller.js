import Gallery from "../models/gallery.model.js"

const galleryController = async (req, res) => {
    const gallery = await Gallery.find({});

    if(gallery.length < 0) {
      return res.status(200).json({error: false, success: true, message: "Gallery not found"})
    }
    
    return res.status(200).json({error: false, success: true, message: "Gallery find", gallery})
}


const addGallery = async (req, res) => {
  try {
    const { mediaType } = req.body;

    if (!req?.files || !req?.files?.mediaUrl[0]?.path) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Image file is required",
      });
    }

    const imageUrl = req?.files?.mediaUrl[0]?.path; 

    const gallery = await Gallery.create({
      mediaUrl: imageUrl,
      mediaType,
    });

    return res.status(201).json({
      error: false,
      success: true,
      message: "Successfully picture is added",
      gallery,
    });
  } catch (error) {
    console.error("Add Gallery Error:", error.message);
    return res.status(500).json({
      error: true,
      success: false,
      message: "Something went wrong",
    });
  }
};

export {galleryController, addGallery}
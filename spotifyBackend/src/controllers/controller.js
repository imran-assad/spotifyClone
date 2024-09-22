import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const { name, desc, album } = req.body;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    // Upload audio to Cloudinary
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video", // 'video' is used for audio/video files
    });

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image", // 'image' is used for image files
    });

    // Calculate the duration from the uploaded audio
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    // Prepare song data to be saved in the database
    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url, // Correct Cloudinary response
      file: audioUpload.secure_url, // Correct Cloudinary response
      duration,
    };

    // Save to MongoDB
    const song = new songModel(songData); // Use 'new'
    await song.save();

    // Send success response
    res.json({ success: true, message: "Song added successfully" });

    console.log(name, desc, album, audioUpload, imageUpload); // Optional: log data
  } catch (error) {
    // Log and send error response
    console.error(error); // Log the error for debugging
    res.json({ success: false, message: error.message });
  }
};
const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.json({ success: true, songs: allSongs });
  } catch (error) {
    res.json({ success: false });
  }
};

const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song removed" });
  } catch (error) {
    res.json({ success: false });
  }
};

export { addSong, listSong, removeSong };

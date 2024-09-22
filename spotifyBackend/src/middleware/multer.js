import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;

// import multer from "multer";
// import path from "path";

// // Set up storage
// const storage = multer.diskStorage({
//   // Specify the destination folder
//   destination: function (req, file, callback) {
//     callback(null, "uploads/"); // Ensure this directory exists
//   },
//   // Define the filename
//   filename: function (req, file, callback) {
//     // Keep the original file name
//     callback(null, file.originalname);
//   },
// });

// // Initialize multer with the storage configuration
// const upload = multer({ storage });

// // Export the upload middleware
//export default upload;

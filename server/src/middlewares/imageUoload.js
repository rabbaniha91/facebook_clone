import fs from "fs";

const imageUpload = async (req, res, next) => {
  try {
    console.log(req.body);
    const reqFiles =  req.files
  if (!reqFiles || reqFiles.length === 0) {
    return res.status(400).json({ message: "No files selected" });
  }
    
    let files = Object.values(reqFiles).flat();
    const fileTypes = ["jpeg", "png", "gif", "webp"];

    files.forEach((file) => {
      if (!fileTypes.includes(file.mimetype.split("/")[1])) {
        removeTemp(file.tempFilePath);
        throw new Error("Unsupported format");
      }
      if (file.size > 1024 * 1024 * 5) {
        removeTemp(file.tempFilePath);
        throw new Error("file size is too larg");
      }
    });

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeTemp = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
};

export default imageUpload;

import fs from "fs";
import "dotenv/config";
import autoBind from "auto-bind";
import cloudinary from "cloudinary";

class UploadFileController {
  constructor() {
    autoBind(this);
    cloudinary.config({
      cloud_name: process.env.CLOUDINAIRY_CLOUD_NAME,
      api_key: process.env.CLOUDINAIRY_API_KEY,
      api_secret: process.env.CLOUDINAIRY_API_SECRET,
    });
  }

  async uploadImage(req, res) {
    try {
      const { path } = req.body;
      if (!path) return res.status(400).json({ message: "Path is required" });
      const files = Object.values(req.files).flat();
      console.log("contro", files);
      const images = [];
      for (const file of files) {
        const url = await this.#uploadToCloudinairy(file, path);
        console.log("URL : ", url);
        images.push(url);
        this.#removeTemp(file.tempFilePath);
      }
      return res.json({ images });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async #uploadToCloudinairy(file, path) {
    try {
      const response = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: path,
      });
      console.log("RESPONSE : ", response);
      return { url: response.secure_url };
    } catch (err) {
      console.log(err);
      this.#removeTemp(file.tempFilePath);
      return new Error(err.error);
    }
  }
  // async #uploadToCloudinairy(file, path) {
  //   return new Promise((resolve, reject) => {
  //     cloudinary.v2.uploader.upload(
  //       file.tempFilePath,
  //       {
  //         folder: path,
  //       },
  //       (err, res) => {
  //         if (err) {
  //           this.#removeTemp(file.tempFilePath);
  //           return reject(err);
  //         }
  //         resolve({
  //           url: res.secure_url,
  //         });
  //       }
  //     );
  //   });
  // }

  async #removeTemp(path) {
    fs.unlink(path, (error) => {
      if (error) throw new Error("");
    });
  }

  async getImageList(req, res) {
    const { path, sort, max } = req.body;
    cloudinary.v2.search
      .expression(`${path}`)
      .sort_by("created_at", `${sort}`)
      .max_results(max)
      .execute()
      .then((result) => {
        let images = [];
        if(result?.resources?.length > 0){
          images = result.resources.map(item => {
            return {
              url: item.secure_url,
              id: item.public_id
            }
          })
        }
        return res.json(images)
      }).catch(err => {
        console.log(err?.message);
        return res.status(500).json({message: "Error in get images"})
      })
  }
}

export default new UploadFileController();

import express from "express"
import uploadController from "../controllers/uploadController.js"
import verifyJwt from "../middlewares/jwtverify.js"
import imageUpload from "../middlewares/imageUoload.js"
import PostController from "../controllers/postcontroller.js"

const router = express.Router()

router.use(verifyJwt)
router.post("/uploadImage",imageUpload, uploadController.uploadImage)
router.post("/createPost", PostController.createPost)
router.get("/posts", PostController.getPosts)
router.post("/myPosts", PostController.getMyPosts);


export default router;
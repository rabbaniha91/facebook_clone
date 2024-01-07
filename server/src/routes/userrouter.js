import express from 'express';
import registerValidator from '../validators/registervalidator.js';
import userController from '../controllers/usercontroller.js';
import authValidator from '../validators/authvalidator.js';
import verifyJwt from "../middlewares/jwtverify.js";
import uploadController from '../controllers/uploadController.js';

const router = express.Router()

router.post("/register", registerValidator(), userController.register)
router.post("/auth", authValidator(), userController.auth)
router.get("/refresh", userController.refreshToken)
router.post("/finduser", userController.findUser)
router.post("/sendresetpasswordcode", userController.sendResetPasswordCodeHandle)
router.post("/validateresetcode", userController.validateResetCode)
router.post("/changepassword", userController.changePassword);


// protected routes

router.use(verifyJwt)
router.post("/activate", userController.verifyAcount);
router.post("/reSendVerification", userController.reSendVerificationMail)
router.get("/logout", userController.logOut)
router.post("/profileImages", uploadController.getImageList)
router.post("/coverImages", uploadController.getImageList)
router.get("/getProfile/:userName", userController.getProfile)
router.post("/coverUpdate", userController.coverUpdate);
router.post("/profileUpdate", userController.profileUpdate)
router.post("/updateDetails", userController.updateDetails);

export default router;
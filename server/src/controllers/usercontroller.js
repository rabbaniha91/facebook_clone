import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/usermodel.js";
import sendVerficationEmail from "../utilities/mailer.js";
import randomstring from "randomstring";
import ResetCode from "../model/codemodel.js";
import { sendResetPasswordCode } from "../utilities/mailer.js";

export default class userController {
  constructor() {}

  // register

  static async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ message: "Email already exist." });
      }

      const newUser = new User({
        ...req.body,
        userName: req.body.firstName + req.body.lastName,
      });
      newUser.userName = await newUser.generateUserName();

      const mailVerficationToken = jwt.sign(
        {
          id: newUser._id.toString(),
        },
        process.env.MAIL_JWT_TOKEN,
        { expiresIn: "2d" }
      );

      const url = `${process.env.BASE_URL}/activate/${mailVerficationToken}`;

      await sendVerficationEmail(newUser.email, newUser.firstName, url);

      res
        .status(201)
        .json({ message: "new user successfully created.", data: newUser });
      await newUser.save();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // login

  static async auth(req, res) {
    const cookies = req.cookies;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const foundUser = await User.findOne({ email });

      if (!foundUser)
        return res.status(401).json({ message: "user not found" });

      const compare = await bcrypt.compare(password, foundUser.password);

      if (!compare) return res.status(401).json({ message: "Wrong password" });

      const accessToken = jwt.sign(
        { id: foundUser.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );

      const newRefreshToken = jwt.sign(
        { id: foundUser.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "15d" }
      );

      let newRefreshTokenArray;
      if (!cookies?.jwt) {
        newRefreshTokenArray = foundUser.refreshToken;
      } else {
        const refreshToken = cookies.jwt;
        const foundToken = await User.findOne({ refreshToken });
        if (!foundToken) {
          newRefreshTokenArray = [];
        } else {
          newRefreshTokenArray = foundUser.refreshToken.filter(
            (rt) => rt !== cookies.jwt
          );
        }
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
      }

      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];

      foundUser.save();
      const option = {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
      };

      res.cookie("jwt", newRefreshToken, option);

      const userInfo = {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        picture: foundUser.profilPic,
        userName: foundUser.userName,
        verified: foundUser.verified,
      };

      res.status(200).json({ accessToken, userInfo });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  // verify account with email

  static async verifyAcount(req, res) {
    const { token } = req.body;
    if (!token) return res.status(404).json({ message: "token not found" });

    jwt.verify(token, process.env.MAIL_JWT_TOKEN, async (err, user) => {
      if (err) return res.status(400).json({ message: "Invalid token" });

      const foundUser = await User.findById(user.id);
      if (!foundUser) return res.status(404).json({ message: "Invalid token" });
      if (foundUser.id !== req.userId)
        return res.status(403).json({ message: "is Forbidden" });

      if (foundUser.verified === true)
        return res
          .status(400)
          .json({ message: "This email already activated" });

      await User.findByIdAndUpdate(user.id, { verified: true });

      return res.status(200).json({ message: "Acount activated successfully" });
    });
  }

  // refresh token
  static async refreshToken(req, res) {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: "Not verify!" });

    const refreshToken = cookies.jwt;

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    const foundUser = await User.findOne({ refreshToken });

    if (!foundUser) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) return;

          const hackedUser = await User.findOne({ id: decoded.id });
          if (hackedUser) {
            hackedUser.refreshToken = [];
            hackedUser.save();
          }
        }
      );

      return res.status(403);
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken
    );

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          foundUser.refreshToken = [...newRefreshTokenArray];
          await foundUser.save();
        }
        if (err || foundUser.id !== decoded.id) return res.status(403);

        const accessToken = jwt.sign(
          { id: decoded.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "5m" }
        );

        const newRefreshToken = jwt.sign(
          { id: foundUser.id },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "15d" }
        );
        // const updatedUser = await User.findById(foundUser._id);
        // updatedUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];

        // await updatedUser.save();
        const updatedUser = await User.findOneAndUpdate(
          { _id: foundUser._id },
          {
            refreshToken: [...newRefreshTokenArray, newRefreshToken],
            version: foundUser.version + 1,
          },
          { new: true }
        );
        const userInfo = {
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          picture: foundUser.profilPic,
          userName: foundUser.userName,
          verified: foundUser.verified,
        };

        res.cookie("jwt", newRefreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 15 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ accessToken, userInfo });
      }
    );
  }

  // resend verification email
  static async reSendVerificationMail(req, res) {
    try {
      const id = req.userId;
      const user = await User.findById(id);
      if (user.verified === true)
        return res
          .status(400)
          .json({ message: "this account is already activated" });
      const mailVerficationToken = jwt.sign(
        { id: user._id.toString() },
        process.env.MAIL_JWT_TOKEN,
        { expiresIn: "2d" }
      );

      const url = `${process.env.BASE_URL}/activate/${mailVerficationToken}`;

      sendVerficationEmail(user.email, user.firstName, url);
      return res.status(200).json({
        message: "Account activation email has been sent successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // log out

  static async logOut(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }
    user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
    await user.save();
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    return res.sendStatus(204);
  }

  // find user

  static async findUser(req, res) {
    try {
      const { email } = req.body;

      if (!email)
        return res.status(400).json({ message: "Not valid email address" });
      const user = await User.findOne({ email }).select("-password");
      if (!user) return res.status(400).json({ message: "User not found" });
      return res
        .status(200)
        .json({ email: user.email, picture: user.profilPic });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  // send reset password code

  static async sendResetPasswordCodeHandle(req, res) {
    try {
      const { email } = req.body;
      if (!email)
        return res.status(400).json({ message: "Not valid email address" });
      const user = await User.findOne({ email }).select("-password");
      if (!user) return res.status(400).json({ message: "User not found" });
      await ResetCode.findOneAndRemove({ userId: user.id });
      const code = randomstring.generate(5);
      await new ResetCode({
        code,
        userId: user.id,
      }).save();
      await sendResetPasswordCode(user.email, user.firstName, code);
      return res
        .status(200)
        .json({ message: "Reset password code has been sent to your email" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  // validation code

  static async validateResetCode(req, res) {
    try {
      const { email, code } = req.body;
      if (!email || !code)
        return res.status(400).json({ message: "Email or code is empty" });

      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });

      const userReset = await ResetCode.findOne({ userId: user.id });

      if (userReset.code !== code)
        return res.status(403).json({ message: "Reset code is wrong" });

      return res.json({ code });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  // change password

  static async changePassword(req, res) {
    const { email, password, code } = req.body;
    if (!email || !password || !code)
      return res
        .status(400)
        .json({ message: "Email, Password or code can not be empty" });
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "user not found" });
      const resetCode = await ResetCode.findOne({ userId: user.id });
      if (resetCode?.code !== code)
        return res
          .status(403)
          .json({ message: "verification code is wrong..." });
      user.password = password;
      await user.save();
      await resetCode.deleteOne({ code });
      return res.json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  // get user profile

  static async getProfile(req, res) {
    try {
      const { userName } = req.params;
      if (!userName)
        return res.status(400).json({ message: "userName is empty" });
      const profile = await User.findOne({ userName }).select(
        "-password -refreshToken -email -_id"
      );
      if (!profile) return res.status(400).json({ message: "user not found" });
      return res.json(profile);
    } catch (error) {
      return res.status(500).json({ message: "Error in server" });
    }
  }
  // update user cover

  static async coverUpdate(req, res) {
    try {
      const { url } = req.body;
      await User.findByIdAndUpdate(req.userId, {
        cover: url,
      });
      res.json(url);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  // update user profile picture

  static async profileUpdate(req, res) {
    try {
      const { url } = req.body;
      await User.findByIdAndUpdate(req.userId, {
        profilPic: url,
      });
      res.json(url);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateDetails(req, res) {
    try {
      console.log(req.body);
      const infos = req.body;
      const user = await User.findById(req.userId);
      const details = { ...user.details, ...infos };
      user.details = details;
      await user.save();
      res.json(user.details);
    } catch (error) {
      res.status(500).json({ message: "Error on server" });
    }
  }
}

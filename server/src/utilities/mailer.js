import nodemailer from "nodemailer";
import { google } from "googleapis";

const { OAuth2 } = google.auth;

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  OAUTH_LINK,
  MAIL,
} = process.env;

const auth = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  OAUTH_LINK
);

async function config() {
  auth.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await auth.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MAIL,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      accessToken,
      refreshToken: GOOGLE_REFRESH_TOKEN,
    },
  });
}

const sendVerficationEmail = async (email, name, url) => {
  try {
    const stmp = await config();

    const mailOption = {
      from: MAIL,
      to: email,
      subject: "Face book acount verfication",
      html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998">
    <img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px">
    <span>Action requise : Activate your facebook account</span></div>
    <div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto">
    <span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Facebook. To complete your registration, please confirm your account.</span>
    </div><a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br>
    <div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay in touch with all your friends, once refistered on facebook,you can share photos,organize events and much more.</span>
    </div></div>`,
    };

    stmp.sendMail(mailOption, (err, res) => {
      if (err) return err;
      return res;
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendResetPasswordCode = async (email, name, code) => {
  try {
    const stmp = await config();

    const mailOption = {
      from: MAIL,
      to: email,
      subject: "Face book acount verfication",
      html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;
    font-family:Roboto;font-weight:600;color:#3b5998">
    <img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" 
    alt="" style="width:30px"><span>Action requise : Activate your facebook account</span></div>
    <div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;
    font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0">
    <span style="padding:1.5rem 0">You recently created an account on Facebook. To complete your registration,
     please confirm your account.</span></div><a  style="width:200px;padding:10px 15px;background:#4c649b;
     color:#fff;text-decoration:none;font-weight:600">${code}</a><br><div style="padding-top:20px">
     <span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay in touch with all your friends,
      once refistered on facebook,you can share photos,organize events and much more.</span></div></div>`,
    };

    stmp.sendMail(mailOption, (err, res) => {
      if (err) return err;
      return res;
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default sendVerficationEmail;

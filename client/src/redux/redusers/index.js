import { combineReducers } from "redux";
import loginReduser from "./login.js";
import registerReducer from "./regiter.js";
import accessTokenReducer from "./accessToken.js";
import verifyAccountReducer from "./verifyaccountreducer.js";
import resetPasswordReducer from "./resetpassword.js";
import postReducer from "./postreducer.js";
import getPostReducer from "./getPost.js";
import getProfileReducer from "./getProfile.js";
import setCoverReducer from "./setCover.js";
import myPostReducer from "./mypost.js";

export default combineReducers({
  user: loginReduser,
  register: registerReducer,
  newAccessToken: accessTokenReducer,
  verifyAccount: verifyAccountReducer,
  resetPassword: resetPasswordReducer,
  post: postReducer,
  posts: getPostReducer,
  myPosts: myPostReducer,
  profile: getProfileReducer,
  cover: setCoverReducer
});

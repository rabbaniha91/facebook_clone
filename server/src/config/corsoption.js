import allowedOrigin from "./allowedorigin.js";

const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      return new Error("not allowed by cors");
    }
  },
  optionSuccessStatus: 200,
};


export default corsOption;
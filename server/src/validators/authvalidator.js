import { body } from "express-validator";

const authValidator = () => {
  return [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Invalid Email address"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ];
};

export default authValidator;

import { body } from "express-validator";
import User from "../model/usermodel.js";

const registerValidator = () => {
  return [
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 chracters."),
    body("lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 chracters."),
    body("email").isEmail().withMessage("Invalid email address."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password name must be at least 8 chracters.")
      .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])/)
      .withMessage(
        "The password must be a combination of uppercase and lowercase English letters, numbers and special characters"
      ),
    body("bYear")
      .not()
      .isEmpty()
      .withMessage("Bearth year can not be ematy")
      .isInt({ max: 2005 })
      .withMessage("The minimum age for registration is 18 years"),
    body("bMonth")
      .not()
      .isEmpty()
      .withMessage("Bearth month can not be ematy")
      .isInt({ min: 1, max: 12 })
      .withMessage("Bearth  month must be between 1 and 12"),
    body("bDay")
      .not()
      .isEmpty()
      .withMessage("Bearth day can not be ematy")
      .isInt({ max: 2005 })
      .withMessage("Day must be between 1 and 31"),
    body("gender")
      .isIn("male", "female", "custom")
      .withMessage("Gender can be male, female or custom"),
  ];
};

export default registerValidator;

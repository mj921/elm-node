import express from "express";
import UserController from "../../../controllers/UserController";
import UserParamValid from "../../../paramsValids/UserParamValid";
import paramsValid from "../../../middlewares/paramsValid";

const router = express.Router();
const userController = new UserController();
router.post("/register", paramsValid(UserParamValid.register), (req, res, next) => {
  userController.register(req, res, next);
});
export default router;
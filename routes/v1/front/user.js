import express from "express";
import UserController from "../../../controllers/UserController";
import UserParamValid from "../../../paramsValids/UserParamValid";
import paramsValid from "../../../middlewares/paramsValid";
import checkLogin from "../../../middlewares/checkLogin";

const router = express.Router();
const userController = new UserController();
router.post("/register", paramsValid(UserParamValid.register), (req, res, next) => {
  userController.register(req, res, next);
});
router.post("/login", paramsValid(UserParamValid.login), (req, res, next) => {
  userController.login(req, res, next);
});
router.get("/userinfo", checkLogin, (req, res, next) => {
  userController.getLoginUserInfo(req, res, next);
});
export default router;
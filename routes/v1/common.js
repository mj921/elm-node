import express from "express";
import CommonController from "../../controllers/CommonController";
import paramsValid from "../../middlewares/paramsValid";
import CommonParanValid from "../../paramsValids/CommonParamValid";

const router = express.Router();
const commonController = new CommonController();
router.get("/upload", (req, res, next) => {
  commonController.getUploadInfo(req, res, next);
});
router.post("/manage/login", paramsValid(CommonParanValid.login), (req, res, next) => {
  commonController.manageLogin(req, res, next);
});
router.post("/manage/logout", (req, res, next) => {
  commonController.manageLogout(req, res, next);
});
export default router;
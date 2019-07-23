import express from "express";
import paramsValid from "../../../middlewares/paramsValid";
import MerchantParamValid from "../../../paramsValids/MerchantParamValid";
import MerchantController from "../../../controllers/MerchantController";
import checkLogin from "../../../middlewares/checkLogin";

const router = express.Router();
const merchantController = new MerchantController();
router.get("/", checkLogin, paramsValid(MerchantParamValid.getMerchants), (req, res, next) => {
  merchantController.getMerchants(req, res, next);
});
router.post("/", checkLogin, paramsValid(MerchantParamValid.addMerchant), (req, res, next) => {
  merchantController.addMerchant(req, res, next);
});
router.delete("/:id", checkLogin, paramsValid(MerchantParamValid.deletedMerchant), (req, res, next) => {
  merchantController.deleteMerchant(req, res, next);
});
router.get("/types", checkLogin, paramsValid(MerchantParamValid.getMerchantTypes), (req, res, next) => {
  merchantController.getMerchantTypes(req, res, next);
});
router.get("/:id", checkLogin, paramsValid(MerchantParamValid.getMerchant), (req, res, next) => {
  merchantController.getMerchant(req, res, next);
});
router.get("/info", checkLogin, paramsValid(MerchantParamValid.getMerchant), (req, res, next) => {
  merchantController.getMerchant(req, res, next);
});
router.put("/", checkLogin, paramsValid(MerchantParamValid.updateMerchant), (req, res, next) => {
  merchantController.updateMerchant(req, res, next);
});
router.put("/audit", checkLogin, paramsValid(MerchantParamValid.auditMerchant), (req, res, next) => {
  merchantController.auditMerchant(req, res, next);
});
router.put("/status", checkLogin, paramsValid(MerchantParamValid.updateMerchantStatus), (req, res, next) => {
  merchantController.updateMerchantStatus(req, res, next);
});
router.get("/types", checkLogin, paramsValid(MerchantParamValid.getMerchantTypes), (req, res, next) => {
  merchantController.getMerchantTypes(req, res, next);
});
export default router;
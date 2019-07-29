import express from "express";
import paramsValid from "../../../middlewares/paramsValid";
import MerchantParamValid from "../../../paramsValids/MerchantParamValid";
import MerchantController from "../../../controllers/MerchantController";
import checkLogin from "../../../middlewares/checkLogin";

const router = express.Router();
const merchantController = new MerchantController();
router.get("/", paramsValid(MerchantParamValid.searchMerchants), (req, res, next) => {
  merchantController.searchMerchants(req, res, next);
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
router.get("/types", checkLogin, paramsValid(MerchantParamValid.getMerchantTypes), (req, res, next) => {
  merchantController.getMerchantTypes(req, res, next);
});
export default router;
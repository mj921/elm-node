import express from "express";
import paramsValid from "../../../middlewares/paramsValid";
import checkLogin from "../../../middlewares/checkLogin";
import AddressController from "../../../controllers/AddressController";
import AddressParamValid from "../../../paramsValids/AddressParamValid";

const router = express.Router();
const addressController = new AddressController();
router.post("/", checkLogin, paramsValid(AddressParamValid.addAddress), (req, res, next) => {
  addressController.addAddress(req, res, next);
});
router.get("/user", checkLogin, paramsValid(AddressParamValid.getUserAddresss), (req, res, next) => {
  addressController.getUserAddresss(req, res, next);
});

export default router;
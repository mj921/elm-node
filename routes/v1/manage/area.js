import express from "express";
import AreaController from "../../../controllers/AreaController";
import AreaParamValid from "../../../paramsValids/AreaParamValid";
import paramsValid from "../../../middlewares/paramsValid";

const router = express.Router();
const areaController = new AreaController();
router.get("/", paramsValid(AreaParamValid.getAreas), (req, res, next) => {
  areaController.getAreas(req, res, next);
});
router.get("/:id", paramsValid(AreaParamValid.getArea), (req, res, next) => {
  areaController.getArea(req, res, next);
});
export default router;
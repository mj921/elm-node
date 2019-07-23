import express from "express";
import DishController from "../../../controllers/DishController";
import DishParamValid from "../../../paramsValids/DishParamValid";
import paramsValid from "../../../middlewares/paramsValid";

const router = express.Router();
const dishController = new DishController();
router.get("/", paramsValid(DishParamValid.getDishs), (req, res, next) => {
  dishController.getDishs(req, res, next);
});
router.get("/all", paramsValid(DishParamValid.getDishAll), (req, res, next) => {
  dishController.getDishAll(req, res, next);
});
router.get("/:id", paramsValid(DishParamValid.getDish), (req, res, next) => {
  dishController.getDish(req, res, next);
});
router.post("/", paramsValid(DishParamValid.addDish), (req, res, next) => {
  dishController.addDish(req, res, next);
});
router.put("/", paramsValid(DishParamValid.updateDish), (req, res, next) => {
  dishController.updateDish(req, res, next);
});
router.delete("/:id", paramsValid(DishParamValid.deleteDish), (req, res, next) => {
  dishController.deleteDish(req, res, next);
});
router.get("/:id/materials", paramsValid(DishParamValid.getDishMaterials), (req, res, next) => {
  dishController.getDishMaterials(req, res, next);
});
router.put("/status", paramsValid(DishParamValid.updateDishStatus), (req, res, next) => {
  dishController.updateDishStatus(req, res, next);
});
export default router;
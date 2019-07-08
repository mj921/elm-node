import express from "express";
import MaterialController from "../../controllers/MaterialController";
import MaterialParamValid from "../../paramsValids/MaterialParamValid";
import paramsValid from "../../middlewares/paramsValid";

const router = express.Router();
const materialController = new MaterialController();
router.get("/", paramsValid(MaterialParamValid.getMaterials), (req, res, next) => {
  materialController.getMaterials(req, res, next);
});
router.get("/all", paramsValid(MaterialParamValid.getMaterialAll), (req, res, next) => {
  materialController.getMaterialAll(req, res, next);
});
router.get("/:id", paramsValid(MaterialParamValid.getMaterial), (req, res, next) => {
  materialController.getMaterial(req, res, next);
});
router.post("/", paramsValid(MaterialParamValid.addMaterial), (req, res, next) => {
  materialController.addMaterial(req, res, next);
});
router.put("/", paramsValid(MaterialParamValid.updateMaterial), (req, res, next) => {
  materialController.updateMaterial(req, res, next);
});
router.delete("/:id", paramsValid(MaterialParamValid.deleteMaterial), (req, res, next) => {
  materialController.deleteMaterial(req, res, next);
});
export default router;
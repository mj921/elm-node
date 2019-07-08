import express from "express";
import MenuController from "../../controllers/MenuController";
import MenuParamValid from "../../paramsValids/MenuParamValid";
import paramsValid from "../../middlewares/paramsValid";

const router = express.Router();
const menuController = new MenuController();
router.get("/", paramsValid(MenuParamValid.getMenus), (req, res, next) => {
  menuController.getMenus(req, res, next);
});
router.get("/all", paramsValid(MenuParamValid.getMenuAll), (req, res, next) => {
  menuController.getMenuAll(req, res, next);
});
router.get("/:id", paramsValid(MenuParamValid.getMenu), (req, res, next) => {
  menuController.getMenu(req, res, next);
});
router.post("/", paramsValid(MenuParamValid.addMenu), (req, res, next) => {
  menuController.addMenu(req, res, next);
});
router.put("/", paramsValid(MenuParamValid.updateMenu), (req, res, next) => {
  menuController.updateMenu(req, res, next);
});
router.delete("/:id", paramsValid(MenuParamValid.deleteMenu), (req, res, next) => {
  menuController.deleteMenu(req, res, next);
});
router.get("/:id/dishs", paramsValid(MenuParamValid.getMenuDishs), (req, res, next) => {
  menuController.getMenuDishs(req, res, next);
});
router.put("/status", paramsValid(MenuParamValid.updateMenuStatus), (req, res, next) => {
  menuController.updateMenuStatus(req, res, next);
});
export default router;
import express from "express";
import OrderController from "../../../controllers/OrderController";
import OrderParamValid from "../../../paramsValids/OrderParamValid";
import paramsValid from "../../../middlewares/paramsValid";

const router = express.Router();
const orderController = new OrderController();
router.get("/", paramsValid(OrderParamValid.getOrders), (req, res, next) => {
  orderController.getOrders(req, res, next);
});
router.get("/:id", paramsValid(OrderParamValid.getOrder), (req, res, next) => {
  orderController.getOrder(req, res, next);
});
router.post("/", paramsValid(OrderParamValid.addOrder), (req, res, next) => {
  orderController.addOrder(req, res, next);
});
router.put("/", paramsValid(OrderParamValid.updateOrder), (req, res, next) => {
  orderController.updateOrder(req, res, next);
});
router.delete("/:id", paramsValid(OrderParamValid.deleteOrder), (req, res, next) => {
  orderController.deleteOrder(req, res, next);
});
router.get("/:id/dishs", paramsValid(OrderParamValid.getOrderDishs), (req, res, next) => {
  orderController.getOrderDishs(req, res, next);
});
router.put("/status", paramsValid(OrderParamValid.updateOrderStatus), (req, res, next) => {
  orderController.updateOrderStatus(req, res, next);
});
export default router;
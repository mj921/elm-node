import material from "./material";
import dish from "./dish";
import menu from "./menu";
import order from "./order";
import common from "./common";

export default app => {
  app.use("/api/v1/material", material);
  app.use("/api/v1/dish", dish);
  app.use("/api/v1/menu", menu);
  app.use("/api/v1/order", order);
  app.use("/api/v1/common", common);
};

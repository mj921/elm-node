import merchant from "./merchant";
import common from "./common";
import area from "./area";

export default app => {
  app.use("/api/v1/merchant", merchant);
  app.use("/api/v1/common", common);
  app.use("/api/v1/area", area);
};

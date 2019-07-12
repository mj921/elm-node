import merchant from "./merchant";
import common from "./common";

export default app => {
  app.use("/api/v1/merchant", merchant);
  app.use("/api/v1/common", common);
};

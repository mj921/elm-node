import merchant from "./merchant";
import common from "./common";
import area from "./area";
import dish from "./dish";
import user from "./user";

export default app => {
  app.use("/api/v1/manage/merchant", merchant);
  app.use("/api/v1/manage/common", common);
  app.use("/api/v1/manage/area", area);
  app.use("/api/v1/manage/dish", dish);
  app.use("/api/v1/manage/user", user);
};

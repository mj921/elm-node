import merchant from "./merchant";
import user from "./user";
import dish from "./dish";

export default app => {
  app.use("/api/v1/front/merchant", merchant);
  app.use("/api/v1/front/user", user);
  app.use("/api/v1/front/dish", dish);
};

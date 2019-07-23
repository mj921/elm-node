import manage from "./manage";
import front from "./front";
export default app => {
  manage(app);
  front(app);
};
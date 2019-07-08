import { getConnect, getTransactionsConnect } from "../mysql";

export default class BaseDao {

  // 无事务执行sql
  async execSql(sql, option){
    let result;
    await getConnect(sql, option).then((res) => {
      result = res;
    }).catch(err => {
      throw(err);
    });
    return result;
  }
  // 有事务执行sql
  async execSqlTransaction(processList){
    let result = false;
    await getTransactionsConnect(processList).then(() => {
      result = true;
    }).catch((err) => {
      throw(err);
    });
    return result;
  }
}
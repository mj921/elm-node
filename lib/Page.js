export default class Page {
  constructor({ current = 1, pageSize = 10, total = 0 }) {
    this.current = current;
    this.pageSize = pageSize;
    this.total = total;
    this.totalPage = ~~((total - 1) / pageSize) + 1;
  }
  setTotal(total) {
    this.total = total;
    this.totalPage = ~~((total - 1) / this.pageSize) + 1;
  }
  setPageSize(pageSize) {
    this.pageSize = pageSize;
    this.totalPage = ~~((this.total - 1) / pageSize) + 1;
  }
}
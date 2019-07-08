import MaterialDao from "../daos/MaterialDao";
import Page from "../lib/Page";
import ServiceError from "../lib/ServiceError";
import Material from "../models/Material";

export default class MaterialService {
  constructor() {
    this.materialDao = new MaterialDao();
  }
  /** 获取材料列表 */
  async getMaterials(query) {
    const list = await this.materialDao.getMaterials(query);
    const page = new Page({
      current: query.current,
      pageSize: query.pageSize
    });
    const total = await this.materialDao.getMaterialTotal(query.name);
    page.setTotal(total);
    return {
      list: list.map(item => new Material(item)),
      page
    };
  }
  /** 获取材料列表 不分页*/
  async getMaterialAll(name) {
    const list = await this.materialDao.getMaterialAll(name);
    return list.map(item => new Material(item));
  }
  /** 获取材料 */
  async getMaterial(id) {
    const material = await this.materialDao.getMaterial(id);
    if (!material) {
      throw new ServiceError("该材料不存在");
    }
    return new Material(material);
  }
  /** 新增材料 */
  async addMaterial(materialModel) {
    if (materialModel.name.length > 20) {
      throw new ServiceError("材料名称长度不能大于20");
    }
    if (materialModel.unit.length > 10) {
      throw new ServiceError("材料单位长度不能大于10");
    }
    const material = await this.materialDao.getMaterialByName(materialModel.name);
    if (material) {
      throw new ServiceError("材料名称已存在");
    }
    const result = await this.materialDao.insterMaterial(materialModel);
    return result;
  }
  /** 修改材料 */
  async updateMaterial(materialModel) {
    const material = await this.materialDao.getMaterial(materialModel.id);
    if (!material) {
      throw new ServiceError("该材料不存在");
    }
    if (materialModel.name.length > 20) {
      throw new ServiceError("材料名称长度不能大于20");
    }
    if (materialModel.unit.length > 10) {
      throw new ServiceError("材料单位长度不能大于10");
    }
    const material1 = await this.materialDao.getMaterialByNameAndId(materialModel.name, materialModel.id);
    if (material1) {
      throw new ServiceError("材料名称已存在");
    }
    const result = await this.materialDao.updateMaterial(materialModel);
    return result;
  }
  /** 删除材料 */
  async deleteMaterial(id) {
    const material = await this.materialDao.getMaterial(id);
    if (!material) {
      throw new ServiceError("该材料不存在");
    }
    const result = await this.materialDao.deleteMaterial(id);
    return result;
  }
}
import { BoxBufferGeometry, Group, Mesh, MeshPhongMaterial } from 'three';
import { SceneObject } from '../Types';

export default class BitcoinBlock implements SceneObject {
  container;

  constructor() {
    const geo = new BoxBufferGeometry(100, 10, 10, 100, 100, 100);
    const mat = new MeshPhongMaterial({ color: 0xffffff });
    this.container = new Mesh(geo, mat);
  }
}

class BitcoinBlockClientVersion implements SceneObject {
  public container: Mesh;

  constructor() {
    const geo = new BoxBufferGeometry(100, 10, 10, 100, 100, 100);
    const mat = new MeshPhongMaterial({ color: 0xffffff });
    this.container = new Mesh(geo, mat);
  }
}

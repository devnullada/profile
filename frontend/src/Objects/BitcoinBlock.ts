import {
  BoxBufferGeometry,
  Group,
  Mesh,
  MeshPhongMaterial,
  Vector3,
} from 'three';
import { ISceneObject } from '../Types';
import Block from './Block';

export type BitcoinBlockParams = {
  text?: string;
  position?: Vector3;
};

export default class BitcoinBlock implements ISceneObject<Group> {
  threeObject;
  blockParts: any[] = [];

  constructor({ text, position = new Vector3() }: BitcoinBlockParams) {
    this.threeObject = new Group();

    const block = new Block({
      text: 'Hallo',
      dimensions: new Vector3(100, 20, 10),
      position: new Vector3(0, 40, 0),
    });
    this.blockParts.push(block);
  }
}

class BitcoinBlockClientVersion implements ISceneObject<Mesh> {
  threeObject;

  constructor() {
    const geo = new BoxBufferGeometry(100, 10, 10, 100, 100, 100);
    const mat = new MeshPhongMaterial({ color: 0xffffff });
    this.threeObject = new Mesh(geo, mat);
  }
}

import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshPhongMaterial,
  Vector3,
} from 'three';
import { ISceneObject } from '../Types';
import Sentence from './Sentence';

export type BlockParams = {
  dimensions: Vector3;
  segments?: Vector3;
  text?: string;
  position?: Vector3;
};

export default class Block implements ISceneObject<Mesh> {
  threeObject;

  constructor({
    text,
    position = new Vector3(),
    dimensions,
    segments = new Vector3(100, 100, 100),
  }: BlockParams) {
    const geo = new BoxBufferGeometry(
      dimensions.x,
      dimensions.y,
      dimensions.z,
      segments.x,
      segments.y,
      segments.z
    );
    const mat = new MeshPhongMaterial({ color: 0xffffff });
    this.threeObject = new Mesh(geo, mat);
    this.threeObject.position.copy(position);

    if (text) {
      const sentence = new Sentence({
        text,
        position: new Vector3(0, 0, dimensions.z / 2),
        color: new Color(0x000000),
      });
      this.threeObject.add(sentence.threeObject);
    }
  }
}

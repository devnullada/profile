import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';
import {
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  RepeatWrapping,
  sRGBEncoding,
  TextureLoader,
  Vector3,
} from 'three';
import { ISceneObject } from '../Types';

export type TeapotParams = {
  size?: number;
  position?: Vector3;
};

export default class Teapot implements ISceneObject<Mesh> {
  threeObject;

  constructor({ size = 30, position = new Vector3() }: TeapotParams) {
    let tess = 20;
    const bottom = true;
    const lid = true;
    const body = true;
    const fitLid = false;

    const geo = new TeapotGeometry(size, tess, bottom, lid, body, fitLid);
    const textureMap = new TextureLoader().load('/images/tea-mat.svg');
    textureMap.wrapS = textureMap.wrapT = RepeatWrapping;
    textureMap.anisotropy = 16;
    textureMap.encoding = sRGBEncoding;

    const mat = new MeshPhongMaterial({
      map: textureMap,
      side: DoubleSide,
    });
    this.threeObject = new Mesh(geo, mat);
    this.threeObject.position.copy(position);
  }
}

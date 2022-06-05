import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';
import {
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  RepeatWrapping,
  sRGBEncoding,
  TextureLoader,
} from 'three';
import { SceneObject } from '../Types';

export default class Teapot implements SceneObject {
  container;

  constructor() {
    const teapotSize = 10;

    let tess = 20;
    const bottom = true;
    const lid = true;
    const body = true;
    const fitLid = false;

    const geo = new TeapotGeometry(teapotSize, tess, bottom, lid, body, fitLid);
    const textureMap = new TextureLoader().load('/images/tea-mat.svg');
    textureMap.wrapS = textureMap.wrapT = RepeatWrapping;
    textureMap.anisotropy = 16;
    textureMap.encoding = sRGBEncoding;

    const mat = new MeshPhongMaterial({
      map: textureMap,
      side: DoubleSide,
    });
    this.container = new Mesh(geo, mat);
    this.container.position.set(0, teapotSize / 2, 0);
  }
}

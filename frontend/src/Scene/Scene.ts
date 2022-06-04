import {
  AbstractAppScene,
  IAppScene,
  SceneConstructorParams,
} from '../State/Types/Types';
import { Text } from 'troika-three-text';
import {
  DoubleSide,
  Fog,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  PlaneBufferGeometry,
  RepeatWrapping,
  sRGBEncoding,
  TextureLoader,
} from 'three';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js';

export default class ProfileScene
  extends AbstractAppScene
  implements IAppScene
{
  teapot?: Mesh;
  randomBox?: Mesh;

  constructor(args: SceneConstructorParams) {
    super(args);
    this.scene.fog = new Fog(0xa0a0a0, 10, 2500);

    // Text
    const myText = new Text();
    myText.text = 'Microsoft SQL Server';
    myText.fontSize = 2;
    myText.color = 0x9966ff;
    myText.sync();
    myText.position.set(0, 200, 0);
    this.scene.add(myText);

    this.createNewTeapot();
    this.createRandomBox();
    this.createFloor();

    this.animate();
  }

  createRandomBox() {}

  createFloor() {
    let tex = new TextureLoader().load('/images/bt_sheet.png');
    tex.anisotropy = 32;
    tex.repeat.set(100, 100);
    tex.wrapT = RepeatWrapping;
    tex.wrapS = RepeatWrapping;
    const geo = new PlaneBufferGeometry(10000, 10000);
    const mat = new MeshLambertMaterial({
      map: tex,
    });
    const mesh = new Mesh(geo, mat);
    mesh.position.set(0, -5, 0);
    mesh.rotation.set(Math.PI / -2, 0, 0);
    this.scene.add(mesh);
  }

  createNewTeapot() {
    if (this.teapot) return;
    const teapotSize = 10;

    let tess = 20;
    const bottom = true;
    const lid = true;
    const body = true;
    const fitLid = false;

    const geo = new TeapotGeometry(teapotSize, tess, bottom, lid, body, fitLid);
    const textureMap = new TextureLoader().load('/images/logo-icon.svg');
    textureMap.wrapS = textureMap.wrapT = RepeatWrapping;
    textureMap.anisotropy = 16;
    textureMap.encoding = sRGBEncoding;

    const mat = new MeshPhongMaterial({
      map: textureMap,
      side: DoubleSide,
    });
    this.teapot = new Mesh(geo, mat);
    this.teapot.position.set(0, teapotSize / 2, 0);
    this.teapot.rotateY(Math.PI / 2);

    this.scene.add(this.teapot);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };
}

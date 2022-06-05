import {
  AbstractAppScene,
  IAppScene,
  SceneConstructorParams,
} from './SceneClass';
import { Mesh } from 'three';
import { SceneObject } from '../Types';
import BitcoinBlock from '../Objects/BitcoinBlock';
import Teapot from '../Objects/Teapot';
import BoxText from '../Objects/BoxText';

export default class ProfileScene
  extends AbstractAppScene
  implements IAppScene
{
  teapot?: Mesh;
  randomBox?: Mesh;
  sceneObjects: SceneObject[] = [];

  constructor(args: SceneConstructorParams) {
    super(args);

    // Text
    this.add(
      new BoxText({
        text: 'Welcome to club. Have tea.',
      })
    );

    this.add(new Teapot());
    this.add(new BitcoinBlock());
    this.createRandomBox();

    this.animate();
  }

  add(obj: SceneObject) {
    this.sceneObjects.push(obj);
    this.scene.add(obj.container);
  }

  createRandomBox() {}

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };
}

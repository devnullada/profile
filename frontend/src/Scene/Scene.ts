import {
  AbstractAppScene,
  IAppScene,
  SceneConstructorParams,
} from './SceneClass';
import { Mesh, Vector3 } from 'three';
import { ISceneObject } from '../Types';
import BitcoinBlock from '../Objects/BitcoinBlock';
import Teapot from '../Objects/Teapot';
import Sentence from '../Objects/Sentence';

export default class ProfileScene
  extends AbstractAppScene
  implements IAppScene
{
  teapot?: Mesh;
  randomBox?: Mesh;
  sceneObjects: ISceneObject<any>[] = [];

  constructor(args: SceneConstructorParams) {
    super(args);

    // Text
    this.add(
      new Sentence({
        text: 'Welcome to club. Have tea.',
        position: new Vector3(0, 60, 0),
      })
    );

    this.add(
      new Teapot({
        size: 20,
        position: new Vector3(0, 10, 0),
      })
    );

    this.add(
      new BitcoinBlock({
        text: 'Bitcoin Block',
        position: new Vector3(0, 20, 0),
      })
    );

    this.animate();
  }

  add(obj: ISceneObject<any>) {
    this.sceneObjects.push(obj);
    this.scene.add(obj.threeObject);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };
}

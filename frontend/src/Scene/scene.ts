import {
  AbstractAppScene,
  IAppScene,
  SceneConstructorParams,
} from '../State/Types/Types';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Text } from 'troika-three-text';

export default class ProfileScene
  extends AbstractAppScene
  implements IAppScene
{
  controls;

  constructor(args: SceneConstructorParams) {
    super(args);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Text
    const myText = new Text();
    myText.text = 'Microsoft SQL Server';
    myText.fontSize = 2;
    myText.position.z = 200;
    myText.color = 0x9966ff;
    myText.sync();
    this.scene.add(myText);

    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  };
}

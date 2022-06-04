import {
  AbstractAppScene,
  IAppScene,
  SceneConstructorParams,
} from '../State/Types/Types';
import { Text } from 'troika-three-text';
import { GridHelper } from 'three';

export default class ProfileScene
  extends AbstractAppScene
  implements IAppScene
{
  constructor(args: SceneConstructorParams) {
    super(args);

    const gridHelper = new GridHelper(4000, 40, 0x0000ff, 0x808080);
    gridHelper.position.y = 0;
    gridHelper.position.x = 0;
    this.scene.add(gridHelper);

    // Text
    const myText = new Text();
    myText.text = 'Microsoft SQL Server';
    myText.fontSize = 2;
    myText.color = 0x9966ff;
    myText.sync();
    this.scene.add(myText);

    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };
}

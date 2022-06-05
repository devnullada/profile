import { SceneObject } from '../Types';
import { Text } from 'troika-three-text';

export type BoxTextParams = {
  text: string;
};

export default class BoxText implements SceneObject {
  container;

  constructor(args: BoxTextParams) {
    this.container = new Text();
    this.container.text = args.text;
    this.container.fontSize = 10;
    this.container.color = 0xffffff;
    this.container.sync();
    this.container.position.set(-100, 40, -40);
  }
}

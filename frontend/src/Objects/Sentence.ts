import { ISceneObject } from '../Types';
import { Text } from 'troika-three-text';
import { Color, Vector3 } from 'three';

export type SentenceParams = {
  text: string;
  position?: Vector3;
  color?: Color;
  fontSize?: number;
};

export default class Sentence implements ISceneObject<Text> {
  threeObject;

  constructor({
    text,
    position = new Vector3(0, 0, 0),
    color = new Color(0xffffff),
    fontSize = 10,
  }: SentenceParams) {
    this.threeObject = new Text();
    this.threeObject.text = text;
    this.threeObject.fontSize = fontSize;
    this.threeObject.color = color;
    this.threeObject.sync();
    this.threeObject.position.copy(position);
  }
}

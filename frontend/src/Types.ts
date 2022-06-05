import { Group, Object3D } from 'three';

export type EulerDimensions = {
  width: number;
  height: number;
};

export interface SceneObject {
  container: Object3D | Group;
}

import { Clock, Scene, WebGLRenderer } from 'three';

export type EulerDimensions = {
  width: number;
  height: number;
};

export interface IAppScene {
  renderer: WebGLRenderer;
  animate: () => void;
  resize: (width: number, height: number) => void;
}

export abstract class AbstractAppScene {
  renderer = new WebGLRenderer({ alpha: true, antialias: true });
  scene = new Scene();
  clock = new Clock();

  resize(width: number, height: number) {
    this.renderer.setSize(width, height);
  }
}

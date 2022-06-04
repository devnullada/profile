import {
  ACESFilmicToneMapping,
  Clock,
  Color,
  PerspectiveCamera,
  PointLight,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from 'three';

export type SceneConstructorParams = {
  element: HTMLDivElement;
  dimensions: EulerDimensions;
};

export type EulerDimensions = {
  width: number;
  height: number;
};

export interface IAppScene {
  renderer: WebGLRenderer;
  animate: () => void;
  resize: (width: number, height: number) => void;
}

// Some initialization here to have cleaner code elsewhere
export abstract class AbstractAppScene {
  renderer = new WebGLRenderer({ alpha: true, antialias: true });
  scene = new Scene();
  camera = new PerspectiveCamera();
  light = new PointLight();
  clock = new Clock();

  protected constructor({ element, dimensions }: SceneConstructorParams) {
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    element.appendChild(this.renderer.domElement);
    element.style.background = 'radial-gradient(#292929, #000000)';
    this.renderer.setSize(dimensions.width, dimensions.height);
    this.initializeCamera();
    this.initializeLight();
  }

  private initializeLight = () => {
    this.light.color = new Color(0xffffff);
    this.light.intensity = 1;
    this.light.position.set(300, 300, 300);
    this.scene.add(this.light);
  };

  private initializeCamera = () => {
    this.camera.near = 1;
    this.camera.fov = 50;
    this.camera.far = 1000;
    this.camera.position.set(0, 10, 100);
    this.scene.add(this.camera);
  };

  resize(width: number, height: number) {
    this.renderer.setSize(width, height);
  }
}

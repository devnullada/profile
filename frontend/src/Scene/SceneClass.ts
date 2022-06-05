import {
  ACESFilmicToneMapping,
  Clock,
  Color,
  Fog,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  PlaneBufferGeometry,
  PointLight,
  RepeatWrapping,
  Scene,
  sRGBEncoding,
  TextureLoader,
  WebGLRenderer,
} from 'three';
import { EulerDimensions } from '../Types';

export type SceneConstructorParams = {
  element: HTMLDivElement;
  dimensions: EulerDimensions;
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
    element.appendChild(this.renderer.domElement);
    this.initializeRenderer(dimensions);
    this.initializeScene();
    this.initializeCamera();
    this.initializeLight();
    this.createFloor();
  }

  private initializeScene() {
    this.scene.fog = new Fog(0xa0a0a0, 10, 2000);
    this.scene.background = new Color(0xe0e0e0);
  }

  private createFloor() {
    const tex = new TextureLoader().load('/images/bt_sheet.png');
    tex.anisotropy = 32;
    tex.repeat.set(10, 10);
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

  private initializeRenderer(dimensions: EulerDimensions) {
    this.renderer.setSize(dimensions.width, dimensions.height);
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
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
    this.camera.position.set(0, 100, 400);
    this.scene.add(this.camera);
  };

  resize(width: number, height: number) {
    this.renderer.setSize(width, height);
  }
}

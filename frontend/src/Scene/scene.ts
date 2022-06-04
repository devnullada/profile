import {
  ACESFilmicToneMapping,
  BufferGeometry,
  Float32BufferAttribute,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  sRGBEncoding,
} from 'three';
import {
  AbstractAppScene,
  EulerDimensions,
  IAppScene,
} from '../State/Types/Types';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// @ts-ignore
import { Text } from 'troika-three-text';

export default class ProfileScene
  extends AbstractAppScene
  implements IAppScene
{
  camera;
  controls;

  constructor({
    element,
    dimensions,
  }: {
    element: HTMLDivElement;
    dimensions: EulerDimensions;
  }) {
    super();
    this.renderer.setSize(dimensions.width, dimensions.height);
    element.appendChild(this.renderer.domElement);
    element.style.background = 'radial-gradient(#292929, #000000)';

    this.scene = new Scene();

    const light = new PointLight(0xffffff, 1);
    light.position.set(300, 300, 300);
    this.scene.add(light);

    this.camera = new PerspectiveCamera(
      50,
      dimensions.width / dimensions.height,
      1,
      1000
    );
    this.camera.position.set(0, 0, 500);
    this.scene.add(this.camera);

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 5000;
      const y = (Math.random() - 0.5) * 5000;
      const z = -Math.random() * 5000;
      starVertices.push(x, y, z);
    }

    // Stars
    const starGeometry = new BufferGeometry();
    const starMaterial = new PointsMaterial({ color: 0xffffff });
    starGeometry.setAttribute(
      'position',
      new Float32BufferAttribute(starVertices, 3)
    );
    const stars = new Points(starGeometry, starMaterial);
    this.scene.add(stars);

    // Create:
    const myText = new Text();
    this.scene.add(myText);

    // Set properties to configure:
    myText.text = 'Microsoft SQL Server';
    myText.fontSize = 2;
    myText.position.z = 200;
    myText.color = 0x9966ff;

    // Update the rendering:
    myText.sync();

    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  };
}

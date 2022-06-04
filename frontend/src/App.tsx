import React, { useRef } from 'react';
import { useEffectOnce } from 'react-use';
import './App.scss';
import ProfileScene from './Scene/Scene';
import { AbstractAppScene } from './State/Types/Types';
import useWindowResizer from './Hooks/useWindowResizer';

const App: React.FC = () => {
  const scene = useRef<AbstractAppScene>();
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffectOnce(() => {
    if (!sceneRef.current) return;
    scene.current = new ProfileScene({
      element: sceneRef.current,
      dimensions: {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      },
    });
  });

  useWindowResizer((e) => {
    if (scene.current) {
      scene.current.resize(
        document.body.clientWidth,
        document.body.clientHeight
      );
    }
  });

  return <div className="App-scene" ref={sceneRef} />;
};

export default App;

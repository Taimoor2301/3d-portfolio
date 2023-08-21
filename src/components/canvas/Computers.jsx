import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.glb");
  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" />
      <ambientLight intensity={2} />
      <pointLight
        intensity={1}
        position={isMobile ? [1.5, -0.75, 0] : [0, -0.75, 0]}
      />
      <spotLight
        position={[-20, 50, 10]}
        angle={10}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.25 : 0.7}
        position={isMobile ? [1, -1.5, -0.1] : [0, -3, -0.1]}
        rotation={[-0.01, -0.1, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    //add eventlistener to changes to the screen size
    const mediaQuery = window.matchMedia("(max-width:500px)");

    //set the initial value of isMobile state
    setIsMobile(mediaQuery.matches);

    //define a callback function to handel changes to the media query
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };
    //add a callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 0, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;

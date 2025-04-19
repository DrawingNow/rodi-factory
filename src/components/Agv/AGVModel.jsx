/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { AgvType, AgvState, ErrorType, defaultAgv } from '../../types/agv';

export default function AGVModel({
  path,
  speed = 0.01,
  scale = [0.5, 0.5, 0.5],
  agv = defaultAgv,
}) {
  const gltf = useGLTF('/agv.glb');
  const ref = useRef();
  const indexRef = useRef(0);
  const pos = useRef({ x: path[0][0], y: path[0][1], z: path[0][2] });

  useFrame(() => {
    if (!ref.current || path.length < 2) return;

    const next = path[(indexRef.current + 1) % path.length];

    const dx = next[0] - pos.current.x;
    const dy = next[1] - pos.current.y;
    const dz = next[2] - pos.current.z;

    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (dist < 0.05) {
      indexRef.current = (indexRef.current + 1) % path.length;
    } else {
      pos.current.x += dx * speed;
      pos.current.y += dy * speed;
      pos.current.z += dz * speed;
    }

    ref.current.position.set(pos.current.x, pos.current.y, pos.current.z);
  });

  return (
    <group ref={ref}>
      <primitive object={gltf.scene.clone()} scale={scale} />
      {agv.hasCargo && (
        <mesh position={[0, 0.5, -0.8]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      )}
    </group>
  );
}

AGVModel.propTypes = {
  path: PropTypes.arrayOf(PropTypes.array).isRequired,
  speed: PropTypes.number,
  scale: PropTypes.array,
  hasCargo: PropTypes.bool,
  agv: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(AgvType)).isRequired,
    line: PropTypes.number.isRequired,
    battery: PropTypes.number.isRequired,
    hasCargo: PropTypes.bool.isRequired,
    state: PropTypes.oneOf(Object.values(AgvState)).isRequired,
    hasError: PropTypes.bool,
    errorType: PropTypes.oneOf(Object.values(ErrorType)),
  }),
};

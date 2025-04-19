/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Line, Box as DreiBox } from '@react-three/drei';
import { Grid as MuiGrid } from '@mui/material';
import { useState } from 'react';
import AGVModel from '../components/Agv/AGVModel';
import AgvStatusPanel from '../components/Agv/AgvStatusPanel';
import { ErrorType, defaultAgv } from '../types/agv';

export default function MapPage() {
  const [selectedAgvId, setSelectedAgvId] = useState(null);

  const agvs = [
    {
      ...defaultAgv,
      id: 1,
      name: 'RODI-FACTORY01',
      line: 1,
      path: [
        [-8, 0, -8], // 문 위치
        [-6, 0, -3], // 선반 앞
        [-8, 0, -8],
      ],
    },
    {
      ...defaultAgv,
      id: 2,
      name: 'RODI-FACTORY02',
      line: 2,
      path: [
        [8, 0, -8],
        [6, 0, -3],
        [8, 0, -8],
      ],
    },
    {
      ...defaultAgv,
      id: 3,
      name: 'RODI-FACTORY03',
      line: 3,
      path: [
        [-8, 0, 8],
        [-6, 0, 3],
        [-8, 0, 8],
      ],
      hasCargo: true,
      hasError: true,
      errorType: ErrorType.SENSER_ERROR,
      battery: 10,
    },
    {
      ...defaultAgv,
      id: 4,
      name: 'RODI-FACTORY04',
      line: 4,
      path: [
        [8, 0, 8],
        [6, 0, 3],
        [8, 0, 8],
      ],
    },
  ];

  const shelves = [
    { id: 's1', position: [-6, 1, -3] },
    { id: 's2', position: [5, 1, -3] },
    { id: 's3', position: [-6, 1, 3] },
    { id: 's4', position: [5, 1, 3] },
  ];

  return (
    <MuiGrid container spacing={2}>
      <MuiGrid size={8}>
        <Canvas camera={{ position: [0, 10, 15], fov: 50 }} style={{ height: '100vh' }}>
          <ambientLight />
          <directionalLight position={[5, 10, 5]} />
          <OrbitControls />
          <Grid args={[20, 20]} />

          {/* 선반 */}
          {shelves.map((shelf) => (
            <DreiBox key={shelf.id} args={[2, 2, 1]} position={shelf.position}>
              <meshStandardMaterial attach="material" color="saddlebrown" />
            </DreiBox>
          ))}
          {/* AGV 및 경로 */}
          {agvs.map((agv) => (
            <>
              <Line
                key={`path-${agv.id}`}
                points={agv.path}
                color={agv.hasError ? 'red' : 'blue'}
                lineWidth={2}
              />
              <AGVModel
                key={agv.id}
                path={agv.path}
                speed={0.02}
                hasCargo={agv.hasCargo}
                agv={agv}
                isSelected={agv.id === selectedAgvId}
                onSelect={(id) => setSelectedAgvId(id)}
              />
            </>
          ))}
        </Canvas>
      </MuiGrid>
      <MuiGrid size={4}>
        {agvs.map((agv) => (
          <AgvStatusPanel
            key={agv.id}
            agv={agv}
            isSelected={agv.id === selectedAgvId}
            onClick={() => setSelectedAgvId(agv.id)}
          />
        ))}
      </MuiGrid>
    </MuiGrid>
  );
}

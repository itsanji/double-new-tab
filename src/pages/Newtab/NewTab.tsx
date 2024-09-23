import React, { useState } from 'react';
import { Group, Layer, Stage, Text } from 'react-konva';
import ResizableRect from './Component/ResizableRect';
import { ShapeAttr } from '../types/types';
import Konva from 'konva';

const NewTab: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('');
  const checkDeselect = (
    e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>
  ) => {
    // Deselect when clicked on empty area
    if (e.target === e.target.getStage()) {
      setSelectedId('');
    }
  };
  const [shapeAttr, setShapeAttr] = useState<ShapeAttr>({
    id: '0',
    fill: 'white',
    height: 100,
    width: 200,
    x: 0,
    y: 0,
  });

  return (
    <div className="body">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          <Group x={50} y={50}>
            <ResizableRect
              isSelected={'0' === selectedId}
              onChange={(newAttrs) => {
                setShapeAttr(newAttrs);
              }}
              onSelect={(id: string) => {
                setSelectedId(id);
              }}
              shapeProps={shapeAttr}
            ></ResizableRect>
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default NewTab;

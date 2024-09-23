import Konva from 'konva';
import React from 'react';
import { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import { ShapeAttr } from '../../types/types';

interface ResizableRectProps {
  shapeProps: ShapeAttr;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onChange: (newAttrs: ShapeAttr) => void;
}

const ResizableRect: React.FC<ResizableRectProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected) {
      if (!shapeRef.current || !trRef.current) {
        console.log('ref error');
        return;
      }
      // Attach transformer to the selected shape
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        onClick={() => {
          onSelect(shapeProps.id);
        }}
        ref={shapeRef}
        {...shapeProps}
        draggable
        shadowColor="black"
        shadowBlur={10}
        shadowOffset={{ x: 5, y: 5 }}
        shadowOpacity={0.6}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          if (!shapeRef.current) {
            return;
          }
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // Reset scale to 1
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default ResizableRect;

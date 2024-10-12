import React from 'react';
import { INote } from '../../types/types';
import Markdown from 'react-markdown';
import { AiOutlineDrag } from 'react-icons/ai';

interface TestNoteProps {
  children?: React.ReactNode;
  startDraggingHandle: (id: string, e: React.MouseEvent<HTMLDivElement>, ref: HTMLDivElement | null) => void;
  note: INote;
  isDragging: boolean;
}

const Note: React.FC<TestNoteProps> = ({ startDraggingHandle, note, isDragging }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 100,
        minHeight: 100,
        color: note.style.color,
        background: note.style.background,
        border: note.style.boder,
        transform: `translate(${note.position.x}px, ${note.position.y}px)`,
        padding: '10px 10px 10px 15px',
        zIndex: isDragging ? 5 : 1,
      }}
      ref={divRef}
    >
      <div
        style={{ width: 25, height: 10, position: 'absolute', top: 0, left: 0 }}
        className="dragger"
        onMouseDown={(e) => startDraggingHandle(note.id, e, divRef.current)}
      >
        <AiOutlineDrag size={20} />
      </div>
      <Markdown>{note.content}</Markdown>
    </div>
  );
};
export default Note;

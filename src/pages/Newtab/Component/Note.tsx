import React from 'react';
import { INote } from '../../types/types';
import Markdown from 'react-markdown';

interface TestNoteProps {
  children?: React.ReactNode;
  startDraggingHandle: (id: string, e: React.MouseEvent<HTMLDivElement>, ref: HTMLDivElement | null) => void;
  note: INote;
}

const Note: React.FC<TestNoteProps> = ({ startDraggingHandle, note }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const markdownContent = '# hello?\n- does [Link](https://google.com) works?\n- why not working?\n';

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
      }}
      ref={divRef}
      onMouseDown={(e) => startDraggingHandle(note.id, e, divRef.current)}
    >
      <Markdown>{markdownContent}</Markdown>
    </div>
  );
};
export default Note;

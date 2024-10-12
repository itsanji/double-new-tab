import React, { useRef, useState } from 'react';
import Note from './Note';
import { INote } from '../../types/types';
import { useNote } from '../hooks/noteHooks';

interface ContainerProps {
  children?: React.ReactNode;
}

const NoteContainer: React.FC<ContainerProps> = () => {
  const [draggingItem, setDraggingDiv] = useState<HTMLDivElement | null>(null);
  const [draggingNote, setDraggingNote] = useState<INote | null>(null);
  const { notes, setNotes } = useNote();
  const position = useRef({ x: 0, y: 0 });
  const startPosition = useRef({ x: 0, y: 0 });
  const newPosition = useRef({ x: 0, y: 0 });

  const startDragHandle = (id: string, e: React.MouseEvent<HTMLDivElement>, div: HTMLDivElement | null) => {
    startPosition.current = { x: e.clientX, y: e.clientY };
    const dragNote = notes.find((note) => note.id === id);
    if (!dragNote) {
      return;
    }
    position.current = JSON.parse(JSON.stringify(dragNote.position));
    setDraggingDiv(div);
    setDraggingNote(dragNote);
  };

  const draggingHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingItem) {
      return;
    }
    const newPos = {
      x: position.current.x + (e.clientX - startPosition.current.x),
      y: position.current.y + (e.clientY - startPosition.current.y),
    };
    draggingItem.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`;
    newPosition.current = newPos;
  };

  const stopDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    // position.current = JSON.parse(JSON.stringify(newPosition.current));
    // update note position to new position
    if (!draggingNote) {
      return;
    }
    draggingNote.position = newPosition.current;
    console.log('stop dragging note: ', draggingNote.id);
    setNotes([...notes]);
    setDraggingDiv(null);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
      }}
      onMouseUp={stopDragging}
      onMouseMove={draggingHandle}
    >
      {notes.map((note) => (
        <Note key={note.id} startDraggingHandle={startDragHandle} note={note} />
      ))}
    </div>
  );
};
export default NoteContainer;

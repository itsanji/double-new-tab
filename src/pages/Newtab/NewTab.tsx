import React from 'react';
import NoteContainer from './Component/NoteContainer';

const NewTab: React.FC = () => {
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <NoteContainer />
      </div>
    </div>
  );
};

export default NewTab;

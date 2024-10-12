import { INote } from '../../types/types';

const constants = {
  NOTES_KEY: 'notes',
};

const defaultNote: INote = {
  id: '1',
  style: {
    boder: '1px solid grey',
    background: '#036016',
    color: 'white',
  },
  position: { x: 10, y: 30 },
};

export { constants, defaultNote };

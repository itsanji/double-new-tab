import React, { useMemo, useState } from 'react';
import { INote } from '../../types/types';
import { constants } from '../utils/utils';

export const useNote = () => {
  const [notes, updateNotesState] = useState<INote[]>(function () {
    // get notes from localStorage
    const xnotes = window.localStorage.getItem(constants.NOTES_KEY);
    if (!xnotes) {
      // return empty notes and save empty notes to localStorage
      window.localStorage.setItem(
        constants.NOTES_KEY,
        JSON.stringify([
          {
            id: '1',
            position: { x: 10, y: 30 },
          },
          {
            id: '2',
            position: { x: 50, y: 150 },
          },
        ])
      );
      return [
        {
          id: '1',
          position: { x: 10, y: 30 },
        },
        {
          id: '2',
          position: { x: 50, y: 150 },
        },
      ];
    }

    try {
      return JSON.parse(xnotes) as INote[];
    } catch (error) {
      console.log('PARSE ERROR');
      return [];
    }
  });

  function setNotes(newNotes: ((preState: INote[]) => INote[]) | INote[]) {
    let notesToUpdate: ((preState: INote[]) => INote[]) | INote[] = newNotes;

    if (typeof newNotes === 'function') {
      notesToUpdate = newNotes(notes);
    }

    window.localStorage.setItem(constants.NOTES_KEY, JSON.stringify(notesToUpdate));
    updateNotesState(notesToUpdate);
  }

  return {
    notes,
    setNotes,
  };
};

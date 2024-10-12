import { useState } from 'react';
import { INote } from '../../types/types';
import { constants, defaultNote } from '../utils/utils';

export const useNote = () => {
  const [notes, updateNotesState] = useState<INote[]>(function () {
    // get notes from localStorage
    const xnotes = window.localStorage.getItem(constants.NOTES_KEY);
    if (!xnotes) {
      // return empty notes and save empty notes to localStorage
      window.localStorage.setItem(constants.NOTES_KEY, JSON.stringify([defaultNote, defaultNote] as INote[]));
      return [defaultNote, { ...defaultNote, id: '2' }];
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

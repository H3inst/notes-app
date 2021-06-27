import React from 'react';
import { useSelector } from 'react-redux';

import { Sidebar } from './Sidebar';
import NoteDetails from './NoteDetails';
import { Unselected } from './Unselected';

export const NotesScreen = () => {
  const { active } = useSelector((state) => state.notes);

  return (
    <div className="notes__main-content">
      <Sidebar />
      <main>{active ? <NoteDetails /> : <Unselected />}</main>
    </div>
  );
};

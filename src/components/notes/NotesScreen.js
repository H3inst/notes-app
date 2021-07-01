import React from 'react';
import { useSelector } from 'react-redux';

import { Sidebar } from './Sidebar';
import NoteDetails from './NoteDetails';
import { Unselected } from './Unselected';
import { Loader } from '../loader/loader';

export const NotesScreen = () => {
  const { active } = useSelector((state) => state.notes);
  const { loading } = useSelector((state) => state.ui);

  return (
    <div className="notes__main-content">
      {loading && <Loader />}
      <Sidebar />
      <main>{active ? <NoteDetails /> : <Unselected />}</main>
    </div>
  );
};

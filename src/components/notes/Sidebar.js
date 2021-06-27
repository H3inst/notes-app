import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { startLogout } from '../../ducks/auth';
import { activeNote, newNote } from '../../ducks/notes';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);
  const { notes } = useSelector((state) => state.notes);
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleAddNew = () => {
    dispatch(newNote());
  };

  const renderNote = ({ id, title, desc, date }) => {
    const formatDate = moment(date);
    const handleActiveNote = () => {
      dispatch(activeNote(id, { id, title, desc, date }));
    };
    const currentNote = active?.id === id && 'active';

    return (
      <button
        key={id}
        type="button"
        className={`list-group-item list-group-item-action border-bottom ${currentNote}`}
        onClick={handleActiveNote}
      >
        <span className="fw-bold fs-4">My first note</span>
        <span style={{ fontWeight: '500' }}>
          This is the description of my note
        </span>
        <small>{formatDate.format('DD/MM/YYYY')}</small>
      </button>
    );
  };

  return (
    <div className="notes__sidebar border-end">
      <div className="d-flex flex-column p-4">
        <div className="d-flex justify-content-between mb-4">
          <span className="fw-bold fs-4 text-muted">What's up {name}</span>
          <button
            className="btn btn-secondary text-muted"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
        <button className="btn btn-primary w-100" onClick={handleAddNew}>
          <i className="fas fa-plus"></i>
          <span> Add a new note</span>
        </button>
      </div>
      <div className="divider bg-secondary w-100 px-4">
        <span className="fw-bold">Notes</span>
      </div>
      <div className="list-group">
        {notes.map((note) => renderNote({ ...note }))}
      </div>
    </div>
  );
};

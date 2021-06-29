import React from 'react';
import { useDispatch } from 'react-redux';

import UnselectedImg from '../../assets/unselected.svg';
import { newNote } from '../../ducks/notes';

export const Unselected = () => {
  const dispatch = useDispatch();

  const handleCreateNote = () => {
    dispatch(newNote());
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <img src={UnselectedImg} className="img-fluid mb-5" alt="unselected" />
      <h3 className="mb-3 fw-bold">There's nothing selected</h3>
      <button className="btn btn-primary btn-lg" onClick={handleCreateNote}>Create a good note</button>
    </div>
  );
};

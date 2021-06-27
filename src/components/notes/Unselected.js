import React from 'react';

import UnselectedImg from '../../assets/unselected.svg';

export const Unselected = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <img src={UnselectedImg} className="img-fluid mb-5" alt="unselected" />
      <h3 className="mb-3 fw-bold">There's nothing selected</h3>
      <button className="btn btn-primary btn-lg">Create a good note</button>
    </div>
  );
};

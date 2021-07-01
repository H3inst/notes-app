import { useEffect } from 'react';
import { useRef } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleteNote, startSaveNote } from '../../ducks/notes';

const NoteDetails = () => {
  const { active: note } = useSelector((state) => state.notes);
  const { values, handleInputChange, reset } = useForm(note);
  const dispatch = useDispatch();

  const { id, title, desc, date } = values;
  const formatedDate = moment(date);
  const activeId = useRef(note.id);
  const { loading } = useSelector((state) => state.ui);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(id, { ...values }));
  }, [dispatch, id, values]);

  const handleSave = () => {
    dispatch(startSaveNote({ ...values }));
  };

  const handleDelete = () => {
    dispatch(startDeleteNote(id));
  };

  return (
    <div className="h-100 overflow-hidden">
      <div className="mb-3">
        <input
          type="text"
          className="note__input-title"
          placeholder="Type your title here"
          name="title"
          onChange={handleInputChange}
          value={title}
        />
        <span className="px-3" style={{ fontWeight: '500' }}>
          {formatedDate.format('DD/MM/YYYY')}
        </span>
      </div>
      <div className="w-100 bg-secondary py-2 px-4 d-flex justify-content-between align-items-center">
        <span className="fw-bold fs-6">Description</span>
        <div>
          <button
            className="btn btn-secondary"
            onClick={handleSave}
            disabled={loading}
          >
            <span>Save</span>
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleDelete}
            disabled={loading}
          >
            <span>Delete</span>
          </button>
        </div>
      </div>
      <textarea
        className="note__input-desc"
        placeholder="Text here your description"
        name="desc"
        onChange={handleInputChange}
        value={desc}
      ></textarea>
    </div>
  );
};

export default NoteDetails;

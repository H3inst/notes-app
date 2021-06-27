import { useEffect } from 'react';
import { useRef } from 'react';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

const NoteDetails = () => {
  const { active: note } = useSelector((state) => state.notes);
  const { values, handleInputChange, reset } = useForm(note);

  const { title, desc, date } = values;
  const formatedDate = moment(date);
  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

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
        <button className="btn btn-secondary">Save</button>
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

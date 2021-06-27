import { db } from '../config/firebase';
import { useLoadNotes } from '../hooks/useLoadNotes';

const INITIAL_STATE = {
  notes: [],
  active: null,
};

const JOURNAL = '/journal';
const NOTES = '/notes';

// Types
// const NOTES_ADD_NOTE = 'NOTES_ADD_NOTE';
const NOTES_ACTIVE_NOTE = 'NOTES_ACTIVE_NOTE';
const NOTES_LOAD_NOTE = 'NOTES_LOAD_NOTE';
// const NOTES_UPDATE_NOTE = 'NOTES_UPDATE_NOTE';
// const NOTES_DELETE_NOTE = 'NOTES_DELETE_NOTE';
// const NOTES_LOGOUT_CLEANING = 'NOTES_LOGOUT_CLEANING';

// Reducer
export default function notesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NOTES_ACTIVE_NOTE:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

    case NOTES_LOAD_NOTE:
      return {
        ...state,
        notes: [...action.payload],
      };
    default:
      return state;
  }
}

// Actions
export const newNote = () => async (dispatch, getState) => {
  const { uid } = getState().auth;

  const newNote = {
    title: '',
    desc: '',
    date: new Date().getTime(),
  };

  const doc = await db.collection(`${uid}${JOURNAL}${NOTES}`).add(newNote);

  dispatch(activeNote(doc.id, newNote));
};

export const activeNote = (id, note) => {
  return {
    type: NOTES_ACTIVE_NOTE,
    payload: { id, ...note },
  };
};

export const startLoadNotes = (uid) => {
  return async (dispatch) => {
    const notes = await useLoadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: NOTES_LOAD_NOTE,
  payload: notes,
});

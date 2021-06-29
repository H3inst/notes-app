import { successAlert } from '../components/alerts/alerts';
import { db } from '../config/firebase';
import { useLoadNotes } from '../hooks/useLoadNotes';
import { finishLoading, setError, setLoading } from './ui';

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
const NOTES_UPDATE_NOTE = 'NOTES_UPDATE_NOTE';
const NOTES_DELETE_NOTE = 'NOTES_DELETE_NOTE';
const NOTES_LOGOUT_CLEANING = 'NOTES_LOGOUT_CLEANING';

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

    case NOTES_UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };

    case NOTES_DELETE_NOTE:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case NOTES_LOGOUT_CLEANING:
      return {
        ...state,
        active: null,
        notes: [],
      };

    default:
      return state;
  }
}

// Actions
export const activeNote = (id, note) => {
  return {
    type: NOTES_ACTIVE_NOTE,
    payload: { id, ...note },
  };
};

export const setNotes = (notes) => ({
  type: NOTES_LOAD_NOTE,
  payload: notes,
});

export const refreshNote = (note) => {
  return {
    type: NOTES_UPDATE_NOTE,
    payload: note,
  };
};

export const deleteNote = (id) => {
  return {
    type: NOTES_DELETE_NOTE,
    payload: id,
  };
};

export const notesLogoutCleaning = () => {
  return {
    type: NOTES_LOGOUT_CLEANING,
  };
};

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

export const startLoadNotes = (uid) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const notes = await useLoadNotes(uid);
    dispatch(setNotes(notes));

  } catch (error) {
    console.log(error);

  } finally {
    dispatch(finishLoading());
  }
};

export const startSaveNote = (note) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { uid } = getState().auth;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    await db.doc(`${uid}${JOURNAL}${NOTES}/${note.id}`).update(noteToFirestore);
    dispatch(refreshNote(note));

  } catch (error) {
    const { message } = error;
    dispatch(setError(message));
    dispatch(finishLoading());

  } finally {
    dispatch(finishLoading());
    successAlert('Note saved successfully.');
  }
};

export const startDeleteNote = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const uid = getState().auth.uid;
    await db.doc(`${uid}${JOURNAL}${NOTES}/${id}`).delete();
    dispatch(deleteNote(id));

  } catch (error) {
    console.log(error);
    dispatch(finishLoading());
    
  } finally {
    dispatch(finishLoading());
  }
};

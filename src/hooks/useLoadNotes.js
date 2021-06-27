import { db } from '../config/firebase';

const JOURNAL = '/journal';
const NOTES = '/notes';

export const useLoadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}${JOURNAL}${NOTES}`).get();
  const notes = [];

  notesSnap.forEach((child) => {
    notes.push({
      id: child.id,
      ...child.data(),
    });
  });

  return notes;
};

import { Note } from "./components/Note.js";

const BASE_URL = 'http://localhost:8080'

const notes = document.querySelector(".notes");
const createNoteBtn = document.querySelector(".create__note");

const nameField = document.querySelector("#name");
const last_nameField = document.querySelector("#last_name");
const textField = document.querySelector("#editor__text");

const fetchData = async () => {
    const fetchData = await fetch(BASE_URL + '/get-all', {
      method: 'POST',
      body: {}
    })

    const data = await fetchData.json()

    return data
} 

const data = await fetchData()

const noteName = `note-component`;

customElements.define(noteName, Note);

const renderNote = (attributes) => {
  const notesComp = document.createElement(noteName);
  notes.append(notesComp);
  notesComp.setAttributes(attributes);
};

const renderNotes = (data) => {
  if (data) {
    for (const note of data) {
      renderNote(note);
    }
  }
};

renderNotes(data.data);

const getAllNotes = () => {
  return document.querySelectorAll(".note");
};

const getNoteById = (id) => {
  const notes = getAllNotes();

  for (const note of notes) {
    if (note.id === `note_${String(id)}`) {
      return note;
    }
  }
};

const createNote = async () => {
  const createdNoteData = await fetch(BASE_URL + '/create', {
    method: 'POST',
    body: JSON.stringify({
      name: nameField.value,
      last_name: last_nameField.value,
      note: textField.value
    })
  })

  const createdNote = await createdNoteData.json()
  renderNote({
    id: createdNote.data.id,
    name: nameField.value,
    last_name: last_nameField.value,
    note: textField.value,
  });
};

createNoteBtn.addEventListener("click", createNote);

let abilityToCreateNote = false;
createNoteBtn.disabled = !abilityToCreateNote;

const checkIfAbleToCreateNote = () => {
  return !(
    checkEmpty(nameField.value) ||
    checkEmpty(last_nameField.value) ||
    checkEmpty(textField.value)
  );
};

const checkEmpty = (value) => {
  return value === "" || value === undefined || value === null ? true : false;
};

const onChangeInput = () => {
  abilityToCreateNote = checkIfAbleToCreateNote();
  createNoteBtn.disabled = !abilityToCreateNote;
};

nameField.addEventListener("keyup", onChangeInput);
last_nameField.addEventListener("keyup", onChangeInput);
textField.addEventListener("keyup", onChangeInput);

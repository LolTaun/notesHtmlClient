const BASE_URL = "http://localhost:8080";

const updateNoteBtn = document.querySelector(".note__update");

const nameField = document.querySelector("#name");
const last_nameField = document.querySelector("#last_name");
const textField = document.querySelector("#editor__text");

const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("id");

const getDataById = async (id) => {
  const fetchData = await fetch(BASE_URL + "/get", {
    method: "POST",
    body: JSON.stringify({
      id: Number(id),
    }),
  });

  const data = await fetchData.json()

  return data;
};

const data = await getDataById(id);

const setDataInInputs = (data) => {
  nameField.value = data.name;
  last_nameField.value = data.last_name;
  textField.value = data.note;
};

setDataInInputs(data.data);

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

const checkIfDataChanged = () => {
  return (
    data.data.name !== nameField.value ||
    data.data.last_name !== last_nameField.value ||
    data.data.note !== textField.value
  );
};

let abilityToUpdateNote = false;
updateNoteBtn.disabled = !abilityToUpdateNote;

const onChangeInput = () => {
  abilityToUpdateNote = checkIfAbleToCreateNote() && checkIfDataChanged();
  updateNoteBtn.disabled = !abilityToUpdateNote;
};

nameField.addEventListener("keyup", onChangeInput);
last_nameField.addEventListener("keyup", onChangeInput);
textField.addEventListener("keyup", onChangeInput);

const updateNote = async () => {
  const updatedNote = fetch(BASE_URL + "/update", {
    method: "POST",
    body: JSON.stringify({
      id: Number(id),
      name: nameField.value,
      last_name: last_nameField.value,
      note: textField.value,
    }),
  });
};

updateNoteBtn.addEventListener("click", updateNote);

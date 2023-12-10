const BASE_URL = 'http://localhost:8080'

export class Note extends HTMLElement {
  deleteBtn;
  note;

  text = "";
  id = "";
  name = "";
  last_name = "";

  constructor() {
    super();
  }

  render() {
    this.innerHTML = `<div class="note" id="note_${this.id}">
    <a href="./note.html?id=${this.id}">
    <div class="note__header">
      <h2>id: ${this.id}</h2>

      ${
        this.name === "" || this.last_name === ""
          ? ``
          : `    <div class="note__creator">
        <b>created by:</b>
        <p>${this.name} ${this.last_name}</p>
      </div>`
      }
    </div>

    <div class="note__text">
      <p>
        ${this.text}
      </p>
    </div>

    
    </a>
    
    <button class="delete" id="delete_${this.id}">
      <img src="./assets/svg/delete.svg" alt="trash can" />
    </button>
  </div>`;
  }

  setEventListeners() {
    this.deleteBtn = this.querySelector(`#delete_${this.id}`);
    this.note = this.querySelector(`#note_${this.id}`);

    this.deleteBtn.addEventListener("click", () => {
      this.removeNote();
    });
  }

  async removeNote() {
    await fetch(BASE_URL + "/delete", {
      method: "POST",
      body: JSON.stringify({
        id: Number(this.id),
      }),
    });

    this.remove();
  }

  setAttributes(attributes) {
    this.text = this.validateAttribute(attributes.note);
    this.id = this.validateAttribute(attributes.id);
    this.name = this.validateAttribute(attributes.name);
    this.last_name = this.validateAttribute(attributes.last_name);

    this.render();
    this.setEventListeners();
  }

  validateAttribute(attribute) {
    return attribute === undefined || attribute === null
      ? ""
      : String(attribute);
  }
}

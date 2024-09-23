import "../css/common.css";
import "../css/emptyList.css";
import "../css/addEditForm.css";
import "../css/notesList.css";
import "../css/dialog.css";
import "../css/header.css";

import { getDate } from "./utils.js";
import { createNoteElement } from "./noteItem.js";

const addNoteButton = document.querySelector('.empty-list-button');
const emptyList = document.querySelector('.empty-list');
const noteListContainer = document.querySelector('ul');
const addEditForm = document.querySelector('.add-note');
const formCancelButton = document.querySelector('.add-note-cancel');
const formSaveButton = document.querySelector('.add-note-save');
const noteTitleInput = document.querySelector('.add-note-form').querySelector('input');
const noteDescriptionInput = document.querySelector('.add-note-form').querySelector('textarea');
const addNewButton = document.querySelector('.add-new-button');
const serchInput = document.getElementById('search-input');
const addNewButtonContainer = document.querySelector('.add-new-button-container');
const dialog = document.querySelector('.dialog');
const dialogCancelButton = document.querySelector('.dialog-cancel-button');
const dialogDeleteButton = document.querySelector('.dialog-delete-button');

let noteReference;
let isEdit = false;

function filterNotes() {
  const notesList = noteListContainer.querySelectorAll('li');
  if(serchInput.value.length < 3){
    notesList.forEach((note) => {
        note.style.display = 'flex';
    })
  } else {
  notesList.forEach(findMatchingNote);
 }
}

function findMatchingNote(note){
  const title = note.firstElementChild.firstElementChild;
  const description = note.firstElementChild.nextElementSibling;
  if(
    title.textContent.toLocaleLowerCase().includes(serchInput.value.toLocaleLowerCase()) ||
    description.textContent.toLocaleLowerCase().includes(serchInput.value.toLocaleLowerCase())
  ){
    note.style.display = 'flex';
  } else {
    note.style.display = 'none';
  }
}

function showAddEditMenu() {
  const formName = addEditForm.firstElementChild.firstElementChild;
  if (isEdit){
    formName.textContent = 'Edit note';
  } else {
    formName.textContent = 'Add new note';
  }
  const allnotes = noteListContainer.querySelectorAll('li');
  allnotes.forEach(disableNoteItemButtons);
  emptyList.classList.add('hide');
  addEditForm.classList.remove('hide');
  addNewButtonContainer.classList.add('hide');
}

function hideAddEddMenu(){
  const allnotes = noteListContainer.querySelectorAll('li');
  if (allnotes.length === 0) {
    emptyList.classList.remove('hide');
  }
  if (allnotes.length > 0){
    addNewButtonContainer.classList.remove('hide');
  }
  closeAndClearForm()
}

function disableNoteItemButtons(note) {
  const buttons = note.querySelectorAll('button');
  buttons.forEach((button) => {
    button.disabled = true;
  })
}

function enableNoteItemButtons(note) {
  const buttons = note.querySelectorAll('button');
  buttons.forEach((button) => {
    button.disabled = false;
  })
}

function closeAndClearForm(){
  addEditForm.classList.add('hide');
  noteTitleInput.value = '';
  noteDescriptionInput.value = '';
  const allnotes = noteListContainer.querySelectorAll('li');
  allnotes.forEach(enableNoteItemButtons);
  isEdit = false;
}

function openEditForm(e) {
  isEdit = true;
  showAddEditMenu()
  const noteElement = e.currentTarget.parentElement.parentElement.parentElement;
  noteReference = noteElement;
  const noteTile = noteElement.firstElementChild.firstElementChild;
  const noteText = noteElement.firstElementChild.nextElementSibling;
  noteTitleInput.value = noteTile.textContent;
  noteDescriptionInput.value = noteText.textContent;
}

function addEditNote(e){
  e.preventDefault();
  const noteName = noteTitleInput.value.trim();
  const noteText = noteDescriptionInput.value.trim();
  const noteDate = getDate();

  if (noteName === '' || noteText === '') {
    alert('Please fill both fields');
    return;
  }

  if (isEdit){
    const beforeUpdateNoteTile = noteReference.firstElementChild.firstElementChild;
    const beforeUpdateNoteText = noteReference.firstElementChild.nextElementSibling;
    beforeUpdateNoteTile.textContent = noteName;
    beforeUpdateNoteText.textContent = noteText;

    addNewButtonContainer.classList.remove('hide');
    closeAndClearForm();
    return;
  }

  const newNote = createNoteElement(noteName, noteText, noteDate, openEditForm, openDialog);
  noteListContainer.appendChild(newNote);
  addNewButtonContainer.classList.remove('hide');
  closeAndClearForm()
}

function openDialog(e){
  const noteElement = e.currentTarget.parentElement.parentElement.parentElement;
  noteReference = noteElement;
  dialog.classList.remove('hide');
}

function closeDialog(){
  dialog.classList.add('hide');
}

function deleteItem(){
  const item = noteReference;
  const allnotes = noteListContainer.querySelectorAll('li');
  const notesQuantity = allnotes.length;
  if (notesQuantity === 1){
    emptyList.classList.remove('hide');
    addNewButtonContainer.classList.add('hide');
  }
  item.remove();
  closeDialog();
}

function init(){
addNoteButton.addEventListener('click', showAddEditMenu);
formCancelButton.addEventListener('click', hideAddEddMenu);
formSaveButton.addEventListener('click', addEditNote);
addNewButton.addEventListener('click', showAddEditMenu);
serchInput.addEventListener('input', filterNotes);
dialogCancelButton.addEventListener('click', closeDialog);
dialogDeleteButton.addEventListener('click', deleteItem);
}

init();


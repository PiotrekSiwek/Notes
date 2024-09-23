const editIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 12.1042L15.3958 10.625L16 10.0208C16.1111 9.90972 16.2569 9.85417 16.4375 9.85417C16.6181 9.85417 16.7639 9.90972 16.875 10.0208L17.4792 10.625C17.5903 10.7361 17.6458 10.8819 17.6458 11.0625C17.6458 11.2431 17.5903 11.3889 17.4792 11.5L16.875 12.1042ZM10 17.5V16.0208L14.5 11.5208L15.9792 13L11.4792 17.5H10ZM2.5 13.125V11.875H8.75V13.125H2.5ZM2.5 9.6875V8.4375H12.2917V9.6875H2.5ZM2.5 6.25V5H12.2917V6.25H2.5Z" fill="#3B3C3E"/>
</svg>
`

const deleteIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.25 16.25H13.75V6.25H6.25V16.25ZM4.375 4.58333V3.33333H7.16667L8 2.5H12L12.8333 3.33333H15.625V4.58333H4.375ZM6.25 17.5C5.91667 17.5 5.625 17.375 5.375 17.125C5.125 16.875 5 16.5833 5 16.25V5H15V16.25C15 16.5833 14.875 16.875 14.625 17.125C14.375 17.375 14.0833 17.5 13.75 17.5H6.25ZM6.25 16.25H13.75H6.25Z" fill="#3B3C3E"/>
</svg>`


export function createNoteElement(noteName, noteText, noteDate, openEditForm, openDialog){

    const listElement = document.createElement('li');
    const listTitle = document.createElement('div');
    const buttonWrapper = document.createElement('div');
    const title = document.createElement('span');
    const description = document.createElement('div');
    const date = document.createElement('div');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    
    listElement.className = 'list-item';
    listTitle.className = 'list-item-title';
  
    title.textContent = noteName;
    description.textContent = noteText;
    description.className = 'list-item-text';
  
    date.className = 'list-item-date';
    date.textContent = noteDate;
    
    editButton.className = 'list-item-button edit';
    editButton.innerHTML = editIcon;
    editButton.addEventListener('click', openEditForm);
    
    deleteButton.className = 'list-item-button';
    deleteButton.innerHTML = deleteIcon;
    deleteButton.addEventListener('click', openDialog);
  
    buttonWrapper.append(editButton, deleteButton);
    listTitle.append(title, buttonWrapper);
    listElement.append(listTitle, description, date);
    
    return listElement;
}
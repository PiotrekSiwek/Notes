export function createNoteElement(noteName, noteText, noteDate, openEditForm, openDialog){

    const listElement = document.createElement('li');
    const listTitle = document.createElement('div');
    const buttonWrapper = document.createElement('div');
    const title = document.createElement('span');
    const description = document.createElement('div');
    const date = document.createElement('div');
    const editButton = document.createElement('button');
    const editImage = document.createElement('img');
    const deleteButton = document.createElement('button');
    const deleteImage = document.createElement('img');
    
    listElement.className = 'list-item';
    listTitle.className = 'list-item-title';
  
    title.textContent = noteName;
    description.textContent = noteText;
    description.className = 'list-item-text';
  
    date.className = 'list-item-date';
    date.textContent = noteDate;
    
    editButton.className = 'list-item-button edit';
    editImage.src = '/assets/editList.svg';
    editButton.appendChild(editImage);
    editButton.addEventListener('click', openEditForm);
    
    deleteButton.className = 'list-item-button';
    deleteImage.src = '/assets/bin.svg';
    deleteButton.appendChild(deleteImage);
    deleteButton.addEventListener('click', openDialog);
  
    buttonWrapper.append(editButton, deleteButton);
    listTitle.append(title, buttonWrapper);
    listElement.append(listTitle, description, date);
    
    return listElement;
}
const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content); //note.id and note.content come from the JSON in the lcoal storage
    notesContainer.insertBefore(noteElement, addNoteButton); //add notes to the browser before the + button

});

//make the button work
addNoteButton.addEventListener("click", () => addNote());


function getNotes(){
    //retrieve all the existing notes from the client's browser
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes){
    //get an array of notes - save all the new notes to the local storage and the client's browser
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes)); // stringify is the opose of parse (transform to JSON file)

}

function createNoteElement(id, content) {
    //get an id for the note and the content of the note.
    //build a new html <textarea> to represent a note
    const element = document.createElement("textarea");
    element.classList.add("note"); //add the type of class note to this element, so the css conects
    element.value = content; //populate note with data
    element.placeholder = "Empty Note"; //when there is no content

    element.addEventListener("change", () =>{ //when user change note
        updateNote(id, element.value);
    });

    //when double click to delete the note
    element.addEventListener("dblclick", () =>{
        const doDelete = confirm("Are you sure you wish to delete this stick note?");

        if(doDelete){
            deleteNote(id, element);
        }
    });

    return element;
}

function addNote(){
    //adding a new note to the html and will save it too, to the local storage
    const existingNotes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 10000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    //append a new note the the array & save to local storage
    existingNotes.push(noteObject);
    saveNotes(existingNotes);
}

function updateNote(id, newContent){
    //will update the note instead of add a new one
    const updateN = getNotes();
    const targetNote = updateN.filter(note => note.id == id)[0]; //filter to find the note that match the id, return a single element that we will use the [0];

    targetNote.content = newContent; //adding new content from user
    saveNotes(updateN); //saves after click outside the note
}

function deleteNote(id,element){
    //get the id and the html element that represents this note and delete it
    const notdelNotes = getNotes().filter(note => note.id != id); //will get everynote but the one that will be deleted

    //will save all the other notes less the one to be deleted &
    // remove the note from browser view.
    saveNotes(notdelNotes);
    notesContainer.removeChild(element);
}

/*Local storage is an API that saves this info in a JSON file*/
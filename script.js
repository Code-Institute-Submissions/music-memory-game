var note = document.querySelectorAll(".note");
let notes = [...note];


// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function placeDeck() {
    var shuffledNotes = shuffle(notes);
    var deck = document.querySelector(".deck");
    for (var i = 0; i < shuffledNotes.length; i++) {
        shuffledNotes.forEach(function(note) {
            deck.appendChild(note);
        });
    }
}

function displayNote(){
    this.classList.remove("hidden");
}


document.body.onload = placeDeck();


for (var i = 0; i < notes.length; i++){
    note = notes[i];
    note.addEventListener("click", displayNote);
    
}
var note = document.querySelectorAll(".note");
let notes = [...note];
var count = 0;

var classesToCheck = [];



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
   if (count<2){
        this.classList.remove("hidden");
        classesToCheck.push(this.className);
        console.log(classesToCheck);
        count ++;
        checkMatch();
   }   
}


function checkMatch(){
    
    if (classesToCheck[0] === classesToCheck [1]){
        console.log("yes!");
        matched();
    } else {
        console.log("no match");
        notMatched();
    }
    
}


function matched(){
    alert('matched');
}

function notMatched(){
    console.log('not matched');

    
}


document.body.onload = placeDeck();


for (var i = 0; i < notes.length; i++){
    note = notes[i];
    note.addEventListener("click", displayNote);
    
}
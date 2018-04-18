$(document).ready(function() {
  startGame();
});


//VARIABLES

var cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

var turnCounter = 0;

var bflat = new Audio();
bflat.src = "assets/sounds/b-flat.mp3";

var c = new Audio();
c.src = "assets/sounds/c.mp3";

var d = new Audio();
d.src = "assets/sounds/d.mp3";

var e = new Audio();
e.src = "assets/sounds/e.mp3";

var f = new Audio();
f.src = "assets/sounds/f.mp3";

var g = new Audio();
g.src = "assets/sounds/g.mp3";

var win = new Audio();
win.src = "assets/sounds/win.mp3";


//EVENTS

//option buttons
$(".hard-btn").on("click", function() {
  $('.spinBack').addClass("plainFront");
  $(".hard-btn").addClass("active");
  $(".easy-btn").removeClass("active");
});
$(".easy-btn").on("click", function() {
  $('.spinBack').removeClass("plainFront");
  $(".easy-btn").addClass("active");
  $(".hard-btn").removeClass("active");
});

//reset button
$(".reset-btn").on("click", function() {
  reset();
});


//add event listeners to display cards on click and add selected class
$('.card').on('click', function() {
  $(this).addClass('flipped selected disabled');
  //play sounds
  if ($(this).data('card-index') == "1") {
    bflat.play();
  }
  else if ($(this).data('card-index') == "2") {
    c.play();
  }
  else if ($(this).data('card-index') == "3") {
    d.play();
  }
  else if ($(this).data('card-index') == "4") {
    e.play();
  }
  else if ($(this).data('card-index') == "5") {
    f.play();
  }
  else if ($(this).data('card-index') == "6") {
    g.play();
  }
  moveCounter();
  checkMatch();
  checkForWin();
});


//FUNCTIONS

function startGame() {
  $('.deck').children().addClass('card notMatched');
  cards = shuffle(cards);
  //assign shuffled cards to divs
  assignIndex();
  //assign colours to cards (after delay for animation on reset)
  setTimeout(function() {
    assignColours();
  }, 500);
}

function reset() {
  //remove classes
  $('.deck').children().removeClass().removeAttr('data').removeData();
  //add animation to spin over cards and remove existing color class
  $('.back').addClass('spinBack').removeClass(function(index, css) {
    return (css.match(/(^|\s)color\S+/g) || []).join(' ');
  });
  //reset counter
  turnCounter = 0;
  $('#counter').html(turnCounter);
  //reset game
  startGame();
}

function moveCounter() {
  if ($('.selected').length == 2) {
    turnCounter++;
    $('#counter').html(turnCounter);
    console.log(turnCounter);
  }
}

//shuffle code from:
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array    
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
//end

function assignIndex() {
  $('.card').each(function(index) {
    $(this).attr('data-card-index', cards[index]);
  });
}

function assignColours() {
  $('.card').each(function(index) {
    $(this).children(".spinBack").addClass("color-" + cards[index]);
  });
}

//animate cards to show match
//leave displayed
function checkMatch() {
  if ($('.selected').length == 2) {
    if ($('.selected').first().data('card-index') == $('.selected').last().data('card-index')) {
      setTimeout(function() {
        $('.selected').each(function() {
          $(this).removeClass("notMatched selected").addClass("animated tada");
          $(this).children(".spinBack").removeClass('spinBack');
        });
      }, 400);
    }
    else {
      setTimeout(function() {
        $('.selected').each(function() {
          $(this).removeClass("flipped disabled selected");
        });
      }, 600);
      //after a delay turn both cards back over
    }
  }
}

function checkForWin() {
  setTimeout(function() {
    if ($('.disabled').length == 12) {
      win.play();
    }
  }, 700);
}

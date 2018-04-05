$(document).ready(function() {

    var cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, ];
    cards = shuffle(cards);

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

    //assign shuffled cards to divs
    assignIndex();
    assignClass();

    function assignIndex() {
        $('.card').each(function(index) {
            $(this).attr('data-card-index', cards[index]);
        });
    }

    function assignClass() {
        $('.card').each(function(index) {
            $(this).addClass("color-" + cards[index]);
        });
    }

    //add event listeners to display cards on click and add selected class

    $('.card').on('click', function() {
        $(this).addClass('selected disabled')
        
        checkMatch();
        $('.disabled').off('click');
        console.log("clicked");
    });



    function checkMatch() {
        if ($('.selected').length == 2) {
            if ($('.selected').first().data('card-index') == $('.selected').last().data('card-index')) {
                console.log("match");
                //remove class "notMatched"
                $('.selected').each(function() {
                    $(this).removeClass("notMatched selected");
                });
                //disable cards so can't be clicked again
                //animate cards to show match
                //leave displayed

            }
            else {
                console.log("no match");
                $('.notMatched').removeClass('disabled selected');
                //animate to show no match
                //after a delay of 1 second turn both cards back over
            }
            
        }
    }
    
    
    
        
});

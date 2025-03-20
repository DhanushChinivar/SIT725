const quotes = [
    "Believe in yourself and all that you are.",
    "You are stronger than you think.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Dream big and dare to fail.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Hardships often prepare ordinary people for an extraordinary destiny."
];

$(document).ready(function(){
    $('.materialboxed').materialbox();

    $('#clickMeButton').click(() => {
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        $('#quoteText').text(randomQuote);
        
        let newButtonText = "Another One!";
        $('#clickMeButton').html(`<i class="material-icons left">auto_fix_high</i>${newButtonText}`);
    });
});

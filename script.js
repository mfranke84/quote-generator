const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner(){
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API
async function getQuote(){
    showLoadingSpinner();

    // Get quote
    const proxyUrl = 'https://fast-shelf-73884.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank, add 'Unknown'
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        
        //Reduce font siz for long quotes
        if (data.quoteText.length > 120){
            quoteText.classList.add('long-quote');    
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    } catch(error) {
        getQuote();

    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');   
}

// Event Listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuote();
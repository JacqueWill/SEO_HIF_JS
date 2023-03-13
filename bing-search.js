// Declare and initialize constants
const apiKey = "dc46558a883b422497f8e35b4098f5da";
const searchForm = document.querySelector('#search-form');
const searchResults = document.querySelector('#search-results');
const pagination = document.querySelector('#pagination');
const prevPageButton = document.querySelector('#prev-page');
const nextPageButton = document.querySelector('#next-page');
const pageNumber = document.querySelector('#page-number');
const totalPageCount = document.querySelector('#total-pages');

// Declare and initialize variables
let currentPage = 1;
let totalResults = 0;
let totalPages = 0;
let currentOffset = 0;
let searchResultsData = [];
let newSearchResultsData =[];
let previousTotalResults = 0;
let clickedUrls = [];
let stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];
let corpus = [];


// Event listener for search form submit
searchForm.addEventListener('submit', event => {
  // location.reload(true);
  event.preventDefault();
  const searchTerm = searchForm.elements['search-term'].value;
  currentOffset = 0;
  currentPage = 1;
  searchBingApi(searchTerm);
});

// Function to search Bing API
function searchBingApi(searchTerm) {

  // Construct API URL with search term and offset
  const apiUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(searchTerm)}&count=50&offset=${previousTotalResults}`;

  // Fetch data from API
  fetch(apiUrl, {
    headers: {
      "Ocp-Apim-Subscription-Key": apiKey
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Get total number of search results and concatenate with existing search results
    totalResults = Object.keys(data.webPages.value).length;

    previousTotalResults = previousTotalResults + totalResults;
    newSearchResultsData = data.webPages.value;
    searchResultsData = searchResultsData.concat(newSearchResultsData);

    if(previousTotalResults>=120){
      // Display search results for first page
      displaySearchResults();
      // Update pagination
      updatePagination();
      
      // setTimeout(() => {console.log("Delayed for 0.01 second.");}, "10");
      preprocessing(searchResultsData);
      tf_idfVectorizer(corpus, searchResultsData);
    }else{
      // setTimeout(() => {console.log("Delayed for 0.5 second.");}, "501");
      searchBingApi(searchForm.elements['search-term'].value);
    }
    console.log("Results acquired, Number of results - ",totalResults);
    // Calculate total pages
    totalResults = Object.keys(searchResultsData).length;
    totalPages = Math.ceil(totalResults / 10);
  })
  .catch(error => {
    console.error(error);
  });
}

// Event listener for previous page button
prevPageButton.addEventListener('click', () => {
  currentOffset -= 10;
  currentPage--;
  displaySearchResults();
  updatePagination();
});

// Event listener for next page button
nextPageButton.addEventListener('click', () => {
  currentOffset += 10;
  currentPage++;

  // Attach labels to clicked urls
  


  // Retrain your model and rerank the results

  displaySearchResults();
  updatePagination();

});

// Function to display search results for current page
function displaySearchResults() {
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const resultsToDisplay = searchResultsData.slice(startIndex, endIndex);

  let html = '';
  resultsToDisplay.forEach(result => {
    html += `
      <article>
        <h2><a href="${result.url}" target ="_blank">${result.name}</a></h2>
        <p>${result.snippet}</p>
      </article>
    `;
  });
  searchResults.innerHTML = html;
  console.log("Search Results slice displayed for page",currentPage)

  // Count clicks on hyperlinks
  const hyperlinks = document.querySelectorAll('#search-results a');
  hyperlinks.forEach(hyperlink => {
    hyperlink.addEventListener('click', () => {
      const clickedUrl = hyperlink.href;
      console.log(`Clicked hyperlink with URL: ${clickedUrl}`);

      // Adding number of clicks to the data
      searchResultsData = searchResultsData.map(obj =>{
        if(obj.url == clickedUrl){
          obj.clicks++;
          console.log('Click acknowledged')
        }
        return obj;
      })
      console.log(searchResultsData)
    });
  });
}

// Function to update pagination and navigation
function updatePagination() {
  pageNumber.textContent = currentPage;
  totalPageCount.textContent = totalPages;

  if (currentPage === 1) {
    prevPageButton.disabled = true;
  } else {
    prevPageButton.disabled = false;
  }

  if (currentPage === totalPages) {
    nextPageButton.disabled = true;
  } else {
    nextPageButton.disabled = false;
  }
  console.log("Pagination Updated for page",currentPage)
}


function clearText(text) {
  return text
    .toLowerCase()
    .replace(/[^A-Za-zА-Яа-яЁёЇїІіҐґЄє0-9\-]|\s]/g, " ")
    .replace(/\s{2,}/g, " ");
}

function removeStopwords(text){
  res = []
    words = text.split(' ')
    for(let i=0;i<words.length;i++) {
       word_clean = words[i].split(".").join("")
       if(!stopwords.includes(word_clean)) {
           res.push(word_clean)
       }
    }
    return(res.join(' '))
}

function tokenizer(text){
  return text.split(/\W+/);
}

function preprocessing(searchResultsData) {
  searchResultsData.forEach(result =>{
    preprocessedResult = clearText(result.snippet);
    preprocessedResult = removeStopwords(preprocessedResult);
    preprocessedResult = tokenizer(preprocessedResult);
    result.preprocessedResults = preprocessedResult
    result.vectors = [];
    result.clicks = 0;
    corpus.push(preprocessedResult);
  })
  
  console.log("Preprocessed text snippets");
}

function tfidf(corpus, term) {
  // Compute the term frequency (TF) and inverse document frequency (IDF) for the given term in each document
  const tfidfScores = corpus.map((doc) => {
    const tf = doc.filter((word) => word === term).length / doc.length;
    const idf = Math.log(corpus.length / corpus.filter((doc) => doc.includes(term)).length);
    return tf * idf;
  });
  
  // Return the TF-IDF score for the term across all documents
  return tfidfScores.reduce((sum, score) => sum + score, 0) / tfidfScores.length;
}

function tf_idfVectorizer(corpus, searchResultsData){
  searchResultsData.forEach(result =>{
    result.preprocessedResults.forEach(text =>{
      result.vectors.push(tfidf(corpus, text));
    })
  })
}


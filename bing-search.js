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
let resultsToDisplay = [];
let newSearchResultsData =[];
let previousTotalResults = 0;
let clickedUrls = [];
// let stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];
// let corpus = [];
let trainData = [];
let testData = [];
var model;

// Event listener for search form submit
searchForm.addEventListener('submit', event => {
  // location.reload(true);
  event.preventDefault();
  const searchTerm = searchForm.elements['search-term'].value;
  currentOffset = 0;
  currentPage = 1;
  searchBingApi(searchTerm);
});

// Create worker for preprocessing the data
let preprocessing_worker = new Worker('preprocessing_worker.js');

// Create worker for word embedding
let embedding_worker = new Worker('embedding_worker.js');

// Create worker for training linear regression model
let trainWorker = new Worker('train_LR_worker.js');

// Create worker for computing similarity scores
let scoreWorker = new Worker('predict_LR_worker.js');

preprocessing_worker.addEventListener('message', event => {
  searchResultsData = event.data[0];
  corpus = event.data[1];
  console.log('Preprocessing Worker acheived');
  embedding_worker.postMessage([corpus,searchResultsData]);
});

embedding_worker.addEventListener('message', event => {
  searchResultsData = event.data;
  console.log('Embedding Worker acheived');
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  testData = searchResultsData.slice(endIndex,);
  // console.log(searchResultsData)
});

trainWorker.addEventListener('message', event=> {
  model = event.data;
  console.log('Model Trained');
  scoreWorker.postMessage([model,testData]);
});

scoreWorker.addEventListener('message', event => {
  testData = event.data;
  
  displaySearchResults();
  updatePagination();
})
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

    if(previousTotalResults>=50){
      // Display search results for first page
      displaySearchResults();
      // Update pagination
      updatePagination();
      
      preprocessing_worker.postMessage(searchResultsData);

    }else{
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

  // If nothing is clicked
  if(Object.keys(trainData).length == 0){
    console.log("No Clicks recorded")
    displaySearchResults();
    updatePagination();
  }else{
    console.log("Updating ranks")
    // Retrain your model and rerank the results
    trainWorker.postMessage([trainData]);

    // Sort test data based on similarity scores
    testData.sort((a, b) => b.score - a.score);
  }
});

// Function to display search results for current page
function displaySearchResults() {
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  // If no results are clicked
  if(Object.keys(trainData).length == 0){
    console.log("No clicks recorded for display")
    resultsToDisplay = searchResultsData.slice(startIndex, endIndex);
  }else{
    console.log("Fetching new ranked results")
    resultsToDisplay = testData.slice(0,10);
  }
  testData = searchResultsData.slice(endIndex,);

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
      // Adding number of clicks to the data
      searchResultsData = searchResultsData.map(obj =>{
        if(obj.url == clickedUrl){
          obj.clicks++;
          trainData.push(obj);
          console.log('Click acknowledged',clickedUrl);
        }
        return obj;
      })
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


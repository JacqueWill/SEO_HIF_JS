// Declare and initialize constants
const apiKey = "dc46558a883b422497f8e35b4098f5da";
const searchForm = document.querySelector('#search-form');
const searchResults = document.querySelector('#search-results');
const pagination = document.querySelector('#pagination');
const prevPageButton = document.querySelector('#prev-page');
const nextPageButton = document.querySelector('#next-page');
const pageNumber = document.querySelector('#page-number');
const totalPageCount = document.querySelector('#total-pages');

// require("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js");

// Declare and initialize variables
let currentPage = 1;
let totalResults = 0;
let totalPages = 0;
let currentOffset = 0;
let searchResultsData = [];
let newSearchResultsData =[];
let previousTotalResults = 0;
let clickedUrls = [];

// jQuery(document).ready(function(){
//   $.getScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js');
// });



// Event listener for search form submit
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = searchForm.elements['search-term'].value;
  currentOffset = 0;
  currentPage = 1;
  searchBingApi(searchTerm);
});

// Function to search Bing API
function searchBingApi(searchTerm) {

  // Construct API URL with search term and offset
  const apiUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(searchTerm)}&count=100&offset=${previousTotalResults}`;

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
    //console.log(typeof newSearchResultsData)

    searchResultsData = searchResultsData.concat(newSearchResultsData);

    //console.log(searchResultsData);

    if(previousTotalResults>=100){
      // Display search results for first page
      displaySearchResults();
      // Update pagination
      updatePagination();

      preprocessing(searchResultsData);

      // newSearchResultsData = searchResultsData

    }else{
      searchBingApi(searchForm.elements['search-term'].value);
    }

    // console.log("Results acquired, Number of results - ",totalResults);

    // Calculate total pages
    totalResults = Object.keys(searchResultsData).length;
    totalPages = Math.ceil(totalResults / 10);
  })
  .catch(error => {
    console.error(error);
  });
}


// // Load the Universal Sentence Encoder model
// async function loadModel() {
//   const model =  tf.loadGraphModel('https://tfhub.dev/google/universal-sentence-encoder/4/model.json');
//   return model;
// }

// // Use the model to encode a sentence
// async function encodeSentence(sentence) {
//   const model =  loadModel();
//   const embeddings = model.execute([sentence]);
//   const encoding = embeddings[0].arraySync()[0];
//   return encoding;
// }

// // Example usage
// const sentence = "The quick brown fox jumps over the lazy dog.";
// const encoding =  encodeSentence(sentence);
// console.log(encoding);


function clearText(text) {
    return text
      .toLowerCase()
      .replace(/[^A-Za-zА-Яа-яЁёЇїІіҐґЄє0-9\-]|\s]/g, " ")
      .replace(/\s{2,}/g, " ");
  }

function preprocessing(searchResultsData) {
  searchResultsData.forEach(result =>{
    // console.log(result.snippet);
    result.preprocessedResults = clearText(result.snippet);
  })
  console.log("Preprocessed text snippets")
  console.log(searchResultsData)
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
  // console.log("Search Results slice displayed for page",currentPage)

  // Count clicks on hyperlinks
  const hyperlinks = document.querySelectorAll('#search-results a');
  hyperlinks.forEach(hyperlink => {
    hyperlink.addEventListener('click', () => {
      const clickedUrl = hyperlink.href;
      console.log(`Clicked hyperlink with URL: ${clickedUrl}`);
      // Include all clicked urls into a single array
      clickedUrls = clickedUrls.concat(clickedUrl)
      // console.log(clickedUrls)
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
  // console.log("Pagination Updated for page",currentPage)
}

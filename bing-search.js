const apiKey = "dc46558a883b422497f8e35b4098f5da";
const searchForm = document.querySelector('#search-form');
const searchResults = document.querySelector('#search-results');
const pagination = document.querySelector('#pagination');
const prevPageButton = document.querySelector('#prev-page');
const nextPageButton = document.querySelector('#next-page');
const pageNumber = document.querySelector('#page-number');
const totalPageCount = document.querySelector('#total-pages');

let currentPage = 1;
let totalResults = 0;
let totalPages = 0;
let currentOffset = 0;
let searchResultsData = [];
let newSearchResultsData =[];
let previousTotalResults = 0;

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = searchForm.elements['search-term'].value;
  currentOffset = 0;
  currentPage = 1;
  searchBingApi(searchTerm);
});

function searchBingApi(searchTerm) {

  const apiUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(searchTerm)}&count=100&offset=${previousTotalResults}`;

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
    totalResults = Object.keys(data.webPages.value).length;

    previousTotalResults = previousTotalResults + totalResults;
    newSearchResultsData = data.webPages.value;
    console.log(typeof newSearchResultsData)

    searchResultsData = searchResultsData.concat(newSearchResultsData);

    console.log(searchResultsData);

    if(previousTotalResults>=100){
      // Display search results for first page
      displaySearchResults();
      // Update pagination
      updatePagination();
    }else{
      searchBingApi(searchForm.elements['search-term'].value);
    }

    console.log("Results acquired, Number of results - ",totalResults);

    totalResults = Object.keys(searchResultsData).length;
    totalPages = Math.ceil(totalResults / 10);
  })
  .catch(error => {
    console.error(error);
  });
}

prevPageButton.addEventListener('click', () => {
  currentOffset -= 10;
  currentPage--;
  displaySearchResults();
  updatePagination();
});

nextPageButton.addEventListener('click', () => {
  currentOffset += 10;
  currentPage++;
  displaySearchResults();
  updatePagination();
});

function displaySearchResults() {
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const resultsToDisplay = searchResultsData.slice(startIndex, endIndex);

  let html = '';
  resultsToDisplay.forEach(result => {
    html += `
      <article>
        <h2><a href="${result.url}">${result.name}</a></h2>
        <p><a href="${result.url}">${result.url}</a></p>
        <p>${result.snippet}</p>
      </article>
    `;
  });
  searchResults.innerHTML = html;
  console.log("Search Results slice displayed for page",currentPage)
}

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

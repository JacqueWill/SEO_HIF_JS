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

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = searchForm.elements['search-term'].value;
  currentOffset = 0;
  currentPage = 1;
  searchBingApi(searchTerm);
});

function searchBingApi(searchTerm) {
    const apiUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(searchTerm)}&count=10&offset=${currentOffset}`;

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
    totalResults = data.webPages.totalEstimatedMatches;
    totalPages = Math.ceil(totalResults / 10);

    const results = data.webPages.value;
    let html = '';
    results.forEach(result => {
      html += `
        <article>
          <h2><a href="${result.url}">${result.name}</a></h2>
          <p><a href="${result.url}">${result.url}</a></p>
          <p>${result.snippet}</p>
        </article>
      `;
    });
    searchResults.innerHTML = html;

    // Update pagination
    updatePagination();
  })
  .catch(error => {
    console.error(error);
  });
}

prevPageButton.addEventListener('click', () => {
  currentOffset -= 10;
  currentPage--;
  searchBingApi(searchForm.elements['search-term'].value);
});

nextPageButton.addEventListener('click', () => {
  currentOffset += 10;
  currentPage++;
  searchBingApi(searchForm.elements['search-term'].value);
});

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
}



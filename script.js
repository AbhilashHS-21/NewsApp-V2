const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const technologyBtn = document.getElementById("technology");
const sportsBtn = document.getElementById("sports");
const entertainmentBtn = document.getElementById("entertainment");

const searchBtn = document.getElementById("search");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsDetails = document.getElementById("newsDetails");

// Array
let newsDataArr = [];

//apis

const API_KEY = "&apiKey=994d145d0f2f4b4c800e7c178211bb54";

const NEWS = "https://newsapi.org/v2/top-headlines?";

const COUNTRY = "country=in";
// const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";

const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

//onload
window.onload = function () {
  newsType.innerHTML = "<h4>Headlines</h4>";
  fetchHeadlines();
};

// Event Listeners
let category;
generalBtn.addEventListener("click", function () {
  category = "&category=general";
  newsType.innerHTML = "<h4>General</h4>";
  fetchNews();
});
businessBtn.addEventListener("click", function () {
  category = "&category=business";
  newsType.innerHTML = "<h4>Business</h4>";
  fetchNews();
});
technologyBtn.addEventListener("click", function () {
  category = "&category=technology";
  newsType.innerHTML = "<h4>Technology</h4>";
  fetchNews();
});
sportsBtn.addEventListener("click", function () {
  category = "&category=sports";
  newsType.innerHTML = "<h4>Sports</h4>";
  fetchNews();
});
entertainmentBtn.addEventListener("click", function () {
  category = "&category=entertainment";
  newsType.innerHTML = "<h4>Entertainment</h4>";
  fetchNews();
});

searchBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Search : " + newsQuery.value + "</h4>";
  fetchQueryNews();
});

const fetchNews = async () => {
  const response = await fetch(NEWS + COUNTRY + category + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    console.log(myJson);
    newsDataArr = myJson.articles;
  } else {
    //handle error
    console.log(response.status, response.statusText);
    newsDetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }
  displayNews();
};

const fetchHeadlines = async () => {
  const response = await fetch(NEWS + COUNTRY + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    //handle error
    console.log(response.status, response.statusText);
  }
  displayNews();
};

const fetchQueryNews = async () => {
  if (newsQuery.value == null) {
    return;
  }
  const response = await fetch(SEARCH_NEWS + newsQuery.value + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    //handle error
    console.log(response.status, response.statusText);
  }
  displayNews();
};

// Get news

// function getNews(){
//   if ((response.status = ok = "ok")) {
//     const myJson = await response.json();
//     newsDataArr = myJson.articles;
//   } else {
//     //handle error
//     console.log(response.status, response.statusText);
//   }
// }

// display news

function displayNews() {
  newsDetails.innerHTML = "";
  // if ((newsDataArr.length = 0)) {
  //   newsDetails.innerHTML = "<h5>No data found.</h5>";
  //   return;
  // }
  newsDataArr.forEach((news) => {
    let date = news.publishedAt.split("T");
    let col = document.createElement("div");
    col.className = "col-sm-12 col-md-4 col-lg-3 mb-1 card";

    let card = document.createElement("div");
    card.className = "py-3";

    let image = document.createElement("img");
    image.setAttribute("height", "160px");
    image.setAttribute("width", "100%");
    image.src = news.urlToImage;

    let cardBody = document.createElement("div");

    let newsHeading = document.createElement("h5");
    newsHeading.className = "card-title";
    newsHeading.innerHTML = news.title;

    let dateHeading = document.createElement("p");
    dateHeading.className = "text-primary ";
    dateHeading.innerHTML = date[0];

    let description = document.createElement("p");
    description.className = "text-muted";
    description.innerHTML = news.description;

    let link = document.createElement("a");
    link.className = "btn btn-dark";
    link.setAttribute("target", "_blank");
    link.href = news.url;
    link.innerHTML = "Read more";

    cardBody.appendChild(newsHeading);
    cardBody.appendChild(description);
    cardBody.appendChild(dateHeading);
    cardBody.appendChild(link);

    card.appendChild(image);
    card.appendChild(cardBody);

    col.appendChild(card);

    newsDetails.appendChild(col);
  });
}

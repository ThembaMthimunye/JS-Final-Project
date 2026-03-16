const recommendationsContainer = document.getElementById("recommendations");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");

let beaches = [];
let temples = [];
let countries = [];

// FETCH JSON DATA
fetch("./travel_recommendation_api.json")
  .then(response => response.json())
  .then(data => {

    console.log("Fetched data:", data);

    beaches = data.beaches;
    temples = data.temples;
    countries = data.countries;

  })
  .catch(error => {
    console.error("Error fetching JSON:", error);
  });


// SEARCH FUNCTION
function searchPlaces(){

const keyword = searchInput.value.toLowerCase().trim();

recommendationsContainer.innerHTML = "";

let results = [];


// BEACH SEARCH
if(keyword.includes("beach")){

results = beaches;

}


// TEMPLE SEARCH
else if(keyword.includes("temple")){

results = temples;

}


// COUNTRY SEARCH (extract cities)
else if(keyword.includes("country")){

countries.forEach(country => {

country.cities.forEach(city => {

results.push({
name: city.name,
imageUrl: city.imageUrl,
description: city.description,
country: country.name
});

});

});

}


// DISPLAY RESULTS
results.forEach(place => {

const card = document.createElement("div");

card.className = "bg-white border rounded-lg shadow";

card.innerHTML = `
<img src="${place.imageUrl}" class="w-full h-48 object-cover rounded-t">

<div class="p-4">

<h2 class="text-lg font-bold">${place.name}</h2>

<p class="text-gray-600">${place.country || ""}</p>

<p class="text-gray-700 text-sm">
${place.description}
</p>

</div>
`;

recommendationsContainer.appendChild(card);

});

}



// CLEAR BUTTON
function clearResults(){

searchInput.value = "";

recommendationsContainer.innerHTML = "";

}



// EVENT LISTENERS
searchButton.addEventListener("click", searchPlaces);

clearButton.addEventListener("click", clearResults);
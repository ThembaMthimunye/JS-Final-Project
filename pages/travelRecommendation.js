
const recommendationsContainer = document.getElementById('recommendations');

fetch('./travel_recommendation_api.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
  })
  .then(data => {
    console.log(data); 
    console.log('xxxxxxx' );
    
    data.forEach(place => {
      
      const card = document.createElement('div');
      card.className = "border rounded p-4 shadow hover:shadow-lg transition";

      const image = document.createElement('img');
      image.src = place.imageUrl; // use your own image
      image.alt = place.name;
      image.className = "w-full h-48 object-cover rounded mb-4";

      const title = document.createElement('h2');
      title.textContent = place.name;
      title.className = "text-xl font-bold mb-2";

      const country = document.createElement('p');
      country.textContent = place.country;
      country.className = "text-gray-600 mb-2";

      const description = document.createElement('p');
      description.textContent = place.description;
      description.className = "text-gray-800";

      
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(country);
      card.appendChild(description);

      recommendationsContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
 const button = document.getElementById("clearButton");

function clearText() {
  document.getElementById("searchInput").value = "";
}


button.addEventListener("click", clearText);
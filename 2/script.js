let images = [];
let json;
let p = document.getElementById('errorP');

async function showFilm(url) {
  try {
    let responce = await fetch(url);
    let json = await responce.json();

    if (json.Error) { 
      throw new Error(json.Error);
    } 

    cinema = json;  

    for (var i = 0; i < cinema.Search.length; i++) {
      images[i] = json.Search[i].Poster;
        if (images[i] == 'N/A') {
          continue;
        }
      let img = document.createElement("img");
      img.setAttribute("src", images[i]);
      document.getElementById("images").appendChild(img);
    }
    p.innerHTML = "";
  } catch(e){
        
        p.innerHTML = e;
    }
}


function buttonClick() {
  try {
    value = document.getElementById("input").value;
    url = "https://www.omdbapi.com/?s=" + value + "&apikey=98e51151";

    showFilm(url);
  } catch (err) {
    alert('Ничего не найдено');
  }
}
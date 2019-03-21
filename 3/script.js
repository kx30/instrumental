let images = [];
let titles = [];
let years = [];
let json;
// let p = document.getElementById('errorP');
let isHidden = false;
let contentDiv = document.getElementById("images");
let popupDiv = document.getElementById("popup");


async function showFilm(url) {
  images = [];
  titles = [];
  years = [];
  contentDiv.innerHTML = "";

  // try {
    let responce = await fetch(url);
    let json = await responce.json();

    if (json.Error) { 
      throw new Error(json.Error);
    } 

    cinema = json;  

    for (var i = 0; i < cinema.Search.length; i++) {
      images[i] = json.Search[i].Poster;
      titles[i] = json.Search[i].Title;
      years[i] = json.Search[i].Year;
        if (images[i] == 'N/A') {
          continue;
        }
      let img = document.createElement("img");
      let star = document.createElement("div");
      star.setAttribute("class", "star");
      img.setAttribute("src", images[i]);
      document.getElementById("images").appendChild(img).setAttribute("onclick", "hide()");
      document.getElementById("images").appendChild(star).setAttribute("onclick", "isFavorite()");
      document.getElementById("images").appendChild(star).style = "width: 50px; height: 50px; background-color: blue;";
      document.getElementById("images").appendChild(star).setAttribute("value", i);
    }

    for (let i = 0; i < titles.length; i++) {
      for (let j = 0; j < localStorage.length; j++) { 
        if (titles[i] == localStorage[titles[j]]) {
          console.log(titles[i]);
          document.getElementsByClassName("star")[i].style = "width: 50px; height: 50px; background-color: yellow";
        }
      }
    }

  //   p.innerHTML = "";
  // } catch(e){
  //       p.innerHTML = e;
  //   }
}

function isFavorite() {
  let itIsFavorite = true;
  let index = event.currentTarget.getAttribute("value");
  console.log(index);
  for (let i = 0; i < localStorage.length; i++) { 
    if (titles[index] === localStorage[titles[i]]) {
      localStorage.removeItem([titles[index]]);
      document.getElementsByClassName("star")[index].style = "width: 50px; height: 50px; background-color: blue";
      itIsFavorite = false;
    }
  }
  
  if (itIsFavorite) {
    localStorage.setItem(titles[index], titles[index]);
    document.getElementsByClassName("star")[index].style = "width: 50px; height: 50px; background-color: yellow";
  }
}

function popupIsFavorite() {
  let isFavorite = true;
  let title = event.currentTarget.parentElement.getElementsByTagName("p")[0];
  for (let i = 0; i < localStorage.length; i++) {
    if (title.innerHTML == localStorage.key(i)) {
      console.log(document.getElementsByClassName("favorite")[0]);
      document.getElementsByClassName("favorite")[0].style = "width: 50px; height: 50px; background-color: blue";
      localStorage.removeItem(title.innerHTML);
      isFavorite = false;
    }
  }
  if (isFavorite) {
    document.getElementsByClassName("favorite")[0].style = "width: 50px; height: 50px; background-color: yellow";
    localStorage.setItem(title.innerHTML, title.innerHTML);
    console.log("meow");
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

function showPopup() {
  for (let i = 0; i < images.length; i++){ 
    if (event.currentTarget.getAttribute("src") == images[i]) {
      console.log(titles[i]);
      let titleP = document.createElement("p");
      let yearP = document.createElement("p");
      let img = document.createElement("img");
      let star = document.createElement("div");
      document.getElementById("popup").appendChild(star).style = "width: 50px; height: 50px; background-color: blue;";
      img.setAttribute("src", images[i]);
      document.getElementById("popup").appendChild(titleP).innerHTML = titles[i];
      document.getElementById("popup").appendChild(yearP).innerHTML = years[i];
      document.getElementById("popup").appendChild(img);
      document.getElementById("popup").appendChild(star).setAttribute("onclick", "popupIsFavorite()");
      document.getElementById("popup").appendChild(star).setAttribute("class", "favorite");

      for (let j = 0; j < localStorage.length; j++) {
        if (titleP.innerHTML == localStorage.key(j)) {
          document.getElementById("popup").appendChild(star).style = "width: 50px; height: 50px; background-color: yellow;";
          console.log(titles[i]);
        }
      }
    }
  }
}

function hide() {
  isHidden = !isHidden;

  if (isHidden) {
    document.getElementById("images").style.display = "none";
    document.getElementById("toBackButton").style.display = "block";
    showPopup();
    console.log(document.getElementById("toBackButton"));
    console.log(document.getElementById("images"));
  } else {
    document.getElementById("images").style.display = "block";
    document.getElementById("toBackButton").style.display = "none";
    popup.innerHTML = "";

    for (let i = 0; i < titles.length; i++) {
      let isFavorite = false;
      for (let j = 0; j < localStorage.length; j++) { 
        if (titles[i] == localStorage[titles[j]]) {
          console.log(titles[i]);
          document.getElementsByClassName("star")[i].style = "width: 50px; height: 50px; background-color: yellow";
          break;
        }
        if (!isFavorite) {
          document.getElementsByClassName("star")[i].style = "width: 50px; height: 50px; background-color: blue";
        }
      }
    }
    console.log(document.getElementById("images"));

  }

}
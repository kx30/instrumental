let images = [];
let json;

function httpGet(url) {

  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
        json = JSON.parse(this.response);
        for (var i = 0; i < json.Search.length; i++) {
          images[i] = json.Search[i].Poster;
          if (images[i] == 'N/A') {
            console.log('MEOW');
            continue;
          }
          let img = document.createElement("img");
          img.setAttribute("src", images[i]);
          document.getElementById("images").appendChild(img);
          console.log(images[i]);
        }
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        console.log('Error: ' + error);
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });

}


function buttonClick() {
  try {
    value = document.getElementById("input").value;
    url = "https://www.omdbapi.com/?s=" + value + "&apikey=98e51151";

    httpGet(url);
  } catch (err) {
    alert('Ничего не найдено');
  }
}
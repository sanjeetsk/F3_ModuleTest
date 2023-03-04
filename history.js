var hist = JSON.parse(localStorage.getItem("hist") || "[]");
var searched = JSON.parse(localStorage.getItem("searched") || "[]");
var index = JSON.parse(localStorage.getItem("index") || "[]");

myDiv = document.getElementById("searchHistory");

hisList(hist);

function hisList(data) {
  console.log(data);
  var histdata = document.getElementById("searchHistory");
  histdata.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
      let item = `
      <li onclick="searchedData(${i})">
      <div>
      ${i + 1}. ${data[i].text.toUpperCase()}
      </div>
      <div>
        Searched on: ${data[i].time}
      </div>
      </li>`;

      histdata.innerHTML += item;
  }
}

function searchedData(i) {
  console.log("clicked", i);
  let click = {
      ind: i,
  };
  index.push(click);
  localStorage.setItem("index", JSON.stringify(index));
  window.location.href = "./searched.html";
}

function clrHis() {
  console.log("Clr Clicked");
  localStorage.removeItem("searched");
  localStorage.removeItem("index");
  localStorage.removeItem("hist");
  location.reload();
}


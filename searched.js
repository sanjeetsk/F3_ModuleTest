var hist = JSON.parse(localStorage.getItem("hist") || "[]");
var searched = JSON.parse(localStorage.getItem("searched") || "[]");
var index = JSON.parse(localStorage.getItem("index") || "[]");
var historyList = document.getElementById("historyList");

let i = Number(index.length - 1);
console.log("i", i, "index", index.length);
let x=index[i].ind;
// console.log(searched[i]);
console.log("x",x);
console.log(searched[x]);
console.log(searched[i]);

fetchdata(searched[x]);
loadList(hist[x]);

function loadList(data) {
    console.log(data);
    var dataList = document.getElementById("dataList");
    dataList.innerHTML = " ";
    let item = `
        <li>
        <div>
        1. ${data.text.toUpperCase()}
        </div>
        <div>
          Searched on: ${data.time}
        </div>
        </li>`;

    dataList.innerHTML = item;
}

function fetchdata(data){
    let myDiv = document.getElementById("flex-container");
    data.items.forEach(item => {
        const bookTitle = item.volumeInfo.title;
        const bookAuthors = item.volumeInfo.authors.join(', ');
        const bookCoverUrl = item.volumeInfo.imageLinks?.thumbnail;
        const publisher = item.volumeInfo.publisher;
        const bookInfo = `
            <div id="container">
                <div id="image">
                    <img src="${bookCoverUrl}" alt="images" width="100%" height="100%">
    
                </div>
                <div id="info">
                    <div id="des">
                        <span>Title: ${bookTitle}</span>
                    </div>
                    <div>Author: ${bookAuthors}</div>
                    <div>Publisher: ${publisher}</div>
                </div>
            </div>
        `;
        myDiv.insertAdjacentHTML('beforeend', bookInfo);
    });
}
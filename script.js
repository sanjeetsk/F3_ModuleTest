var form = document.getElementById("mySearch");
var input = document.getElementById("search");
var displayText = document.getElementById("text");
var myDiv = document.getElementById("flex-container");


var hist = JSON.parse(localStorage.getItem("hist") || "[]");
var searched = JSON.parse(localStorage.getItem("searched") || "[]");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchQuery = input.value;
    let dateAndTime = getTime();

    if (searchQuery !== null) {

        let items = {
            text: searchQuery,
            time: dateAndTime,
        };

        hist.push(items);
        // Store the search query in localStorage
        localStorage.setItem("hist", JSON.stringify(hist));

        displayText.innerHTML = `Books result for ${searchQuery}`;
        const apiurl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;

        fetch(apiurl)
            .then(response => response.json())
            .then(data => {
                myDiv.innerHTML = '';
                searched.push(data);
                localStorage.setItem("searched", JSON.stringify(searched));
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
            })
            .catch(error => console.log(error));
    }
    else{
        alert("fill the input box");
    }

})

btnHistory.onclick = () => {
    window.location.href = "history.html";
}


function getTime() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    const dateandtime = `${day}/${month + 1}/${year} at ${hour + 1}:${minutes + 1
        }`;

    return dateandtime;
}
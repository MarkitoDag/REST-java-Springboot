if (
  sessionStorage.getItem("isAdmin") !== "false" &&
  sessionStorage.getItem("isAdmin") != null
) {
  h =
    "<li><a href='manage.html' id='manage'>Manage Books</a></li><li><a href='newAdmin.html' id='newAdmin'>Create new Admin</a></li>";
  let container = document.getElementById("MenuItems");
  if (container != null) {
    let c = container.innerHTML;
    h = c + h;
    container.innerHTML = h;
  }
}
document.getElementById("manage").style.fontWeight = "bold";
const isLogged = function (comeFrom) {
  var email = sessionStorage.getItem("email");
  var password = sessionStorage.getItem("password");
  sessionStorage.setItem("page", comeFrom);
  if (!email || !password) {
    document.location.href = "login.html";
  } else {
    document.location.href = comeFrom;
  }
};

const showBook = async function () {
  try {
    let res = await fetch("http://127.0.0.1:8080/books");
    const data = await res.json();

    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    let html = "";
    let htmlSegment = `<ul style="list-style-type:none;" class= "book-list">`;
    data.forEach((book) => {
      //     let htmlSegment = `<div class="user">
      //     <img src="${book.image}" >
      //     <h2>${book.title} ${book.author}</h2>
      //     <div class="email"><a href="email:${book.isbn}">${book.isbn}</a></div>
      // </div>`;
      let text = "1" + book.isbn.toString();
      htmlSegment += `<div class="prova"><li class="element">
        <img src="${book.image}" class="book-image" width= 125px>
        <ul style="list-style-type:none;" class= "info">
        <li class="isbn">ISBN: ${book.isbn}</li>
        <li class="title">Title: ${book.title}</li>
        <li class="author">Author: ${book.author}</li>
        <div class="buttonLi"> 
        <button type='button' class ="btn" onclick="showBookDetail(${text})">
        edit
        </button>
        <button type='button' class ="btn red" onclick="del(${text})">
        Delete
        </button>
        </div>
        </ul>
        </li></div`;
    });
    htmlSegment += `</ul>`;
    html += htmlSegment;
    let container = document.querySelector(".container2");
    if (container != null) {
      container.innerHTML = html;
    }
  } catch (error) {
    alert(error);
  }
};

showBook();

const del = async function (isbn) {
  isbn = isbn.toString().substring(1);
  var credential =
    sessionStorage.getItem("email") + ":" + sessionStorage.getItem("password");
  credential = btoa(credential);
  let headers = new Headers();
  headers.append("Authorization", "Basic " + credential);

  const url = `http://127.0.0.1:8080/books/admin/${isbn}`;
  try {
    let res = await fetch(url, {
      method: "DELETE",
      headers: headers,
    });
    if (res.status === 200) {
      alert(`Succesfully deleted!`);
      await showBook();
    } else {
      await showBook();
      alert(`Some Error occured during operation!`);
      let container = document.querySelector(".container2");
      if (container != null) {
        let c = container.innerHTML;
        h = h + c;
        container.innerHTML = h;
      }
    }
  } catch (error) {
    await showBook();
    alert(`Some Error occured during operation!`);
  }
};

const showBookDetail = async function (isbn) {
  sessionStorage.setItem("isbn", isbn);
  document.location.href = "edit.html";
};
const cartCount = async function () {
  var email = sessionStorage.getItem("email");
  var password = sessionStorage.getItem("password");

  var credential =
    sessionStorage.getItem("email") + ":" + sessionStorage.getItem("password");
  credential = btoa(credential);
  let headers = new Headers();
  headers.append("Authorization", "Basic " + credential);

  let url_mod =
    "http://127.0.0.1:8080/users/secured/view-cart/" + btoa(email) + "/badge";

  console.log(url_mod);
  try {
    let res = await fetch(url_mod, {
      method: "GET",
      headers: headers,
    });
    const data = await res.json();

    if (res.status !== 200) {
      alert("someting went wrong with acces");
      return;
    }
    if (data == 0) {
      return;
    }
    let html = `<span class="button__badge">${data}</span>`;

    let container = document.getElementById("badge");
    if (container != null) {
      let c = container.innerHTML;
      html = c + html;
      container.innerHTML = html;
    }
  } catch (error) {
    alert(error);
  }
};
if (sessionStorage.getItem("email") && sessionStorage.getItem("password")) {
  cartCount();
}

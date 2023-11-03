var isbn = sessionStorage.getItem("isbn");
document.getElementById("product").style.fontWeight = "bold";
const url = `http://127.0.0.1:8080/books/${isbn}`;

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
const showBook = async function () {
  try {
    let res = await fetch(url, { method: "GET" });
    const data = await res.json();
    let text = "1" + data.isbn.toString();
    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    let html = "";

    let htmlSegment = `
    <div class="row row-2">
    <h2>${data.title}</h2>
  </div><div class="detail-view-div2"><img src="${data.image}" class="book-detail-image" width= 125px>
  <div class ="d-description">
  <h3>Description:</h3>
  <p>${data.description}</p>
<div class="internal-div">
 <h3>Author:&emsp;${data.author}</h3>
<h3>Publisher:&emsp;${data.publisher}</h3>
<h3>ISBN:&emsp;${data.isbn}</h3>
<h3>Date of publishing:&emsp;${data.date}</h3>
<h3>Left in stock:&emsp;${data.quantity}</h3>
<h3>Price:&emsp;€${data.price}</h3>
</div>
<button type='button' class ="button-detail" onclick="addToCart(${text})" style="color: white;" >
Add to cart
</button>
  </div>

  </div>`;

    html += htmlSegment;
    let container = document.querySelector(".container3");

    container.innerHTML = html;
  } catch (error) {
    alert(error);
  }
};

showBook();
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

const addToCart = async function (i) {
  i = i.toString().substring(1);
  var email = sessionStorage.getItem("email");
  var password = sessionStorage.getItem("password");

  var credential =
    sessionStorage.getItem("email") + ":" + sessionStorage.getItem("password");
  credential = btoa(credential);
  let headers = new Headers();
  headers.append("Authorization", "Basic " + credential);

  let url_mod =
    "http://127.0.0.1:8080/books/secured/add-to-cart/" +
    btoa(email) +
    "/" +
    btoa(i);

  if (!email || !password) {
    document.location.href = "login.html";
  }
  try {
    let res = await fetch(url_mod, {
      method: "POST",
      headers: headers,
    });
    cartCount();
    if (res.status !== 200) {
      alert("someting went wrong!");
    }
  } catch (error) {
    alert(error);
  }
};

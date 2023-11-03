var email = btoa(sessionStorage.getItem("email"));
var password = btoa(sessionStorage.getItem("password"));
var credential =
  sessionStorage.getItem("email") + ":" + sessionStorage.getItem("password");
credential = btoa(credential);
let headers = new Headers();
headers.append("Authorization", "Basic " + credential);

document.getElementById("account").style.fontWeight = "bold";
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
const url = `http://127.0.0.1:8080/users/secured/email/${email}`;

const showUser = async function () {
  try {
    let res = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (res.status === 200) {
      const data = await res.json();

      let age = data.age.toString();
      // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      let html = "";

      let htmlSegment = `
      <div class="row row-2">
    <p>Email:</p>
    <h3>${data.email}</h3>
    </div>
    <div class="row row-2">
    <p>First Name:</p>
    <h3>${data.firstName}</h3>  <p>Last Name:</p>
    <h3>${data.lastName}</h3>
    <p>Age:</p>
    <h3>${age}</h3>
    </div>

    `;

      html += htmlSegment;
      let container = document.querySelector(".containerUser");

      container.innerHTML = html;
    }
  } catch (error) {
    alert(error);
  }
};

showUser();

const showOrder = async function () {
  var email = btoa(sessionStorage.getItem("email"));
  var password = btoa(sessionStorage.getItem("password"));
  var credential =
    sessionStorage.getItem("email") + ":" + sessionStorage.getItem("password");
  credential = btoa(credential);
  let headers = new Headers();
  headers.append("Authorization", "Basic " + credential);

  const url1 = `http://127.0.0.1:8080/users/secured/view_order/${email}`;

  try {
    let res = await fetch(url1, {
      method: "GET",
      headers: headers,
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      data.forEach((element) => {
        let html = `<td>
        <div class="ord">
            <p>Order number: ${element.id}</p><br>
            <p>Date: ${Date(element.date)}</p><br>
            <p>Books:</p><div class="separetor"></div>`;

        element.carts.books.forEach((book) => {
          html += `<div class="books-order">
          
          <img src="${book.book.image}"></img>
          <div><small>${book.book.title}</small></br>
          <small>${book.book.author}</small></br>
          <small>${book.book.isbn}</small></br>
          <small>€${book.book.price}</small></br>
          <small>Purchesed items: ${book.quantity}</small></br>
          </div>
          </div>
          
          `;
        });

        html += `<table id="tot"><tr><td>Subtotal:</td><td>€ ${element.subtotal}</td></tr><tr><td>Tax (22%):</td><td>€ ${element.tax}</td></tr><tr><td>Total:</td><td>€ ${element.total}</td></tr>
        </table></div></td></tr>
        `;

        let container = document.getElementById("orders");
        if (container != null) {
          let c = container.innerHTML;
          html = c + html;
          container.innerHTML = html;
        }
      });

      //   let emission = data;
      //   // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      //   let html = "";

      //   let htmlSegment = `
      //   <div class="row row-2">
      // <p>Email:</p>
      // <h3>${data.email}</h3>
      // </div>
      // <div class="row row-2">
      // <p>First Name:</p>
      // <h3>${data.firstName}</h3>  <p>Last Name:</p>
      // <h3>${data.lastName}</h3>
      // <p>Age:</p>
      // <h3>${age}</h3>
      // </div>
      // <button type="" class= "red" onclick="logOut()">Log Out</button>

      // `;

      //   html += htmlSegment;
      //   let container = document.querySelector(".containerUser");

      //   container.innerHTML = html;
    }
  } catch (error) {
    alert(error);
  }
};
showOrder();
const logOut = function () {
  sessionStorage.clear();
  document.location.href = "index.html";
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

if (document.location.href.match("index.html")) {
  document.getElementById("cart").style.fontWeight = "bold";
}
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

const getCart = async function () {
  var email = sessionStorage.getItem("email");
  var password = sessionStorage.getItem("password");

  var credential =
    sessionStorage.getItem("email") + ":" + sessionStorage.getItem("password");
  credential = btoa(credential);
  let headers = new Headers();
  headers.append("Authorization", "Basic " + credential);

  let url_cart = "http://127.0.0.1:8080/users/secured/view-cart/" + btoa(email);

  try {
    let res = await fetch(url_cart, {
      method: "GET",
      headers: headers,
    });
    let total = 0;

    let data = await res.json();

    if (!data) {
      return;
    }
    data.books.forEach((item) => {
      total += parseFloat(item.book.price) * item.quantity;
      let partial = 0;
      partial += item.book.price * item.quantity;

      let html = `<td><div class="cart-info">
          <img src="${item.book.image}" />
          <div>
            <h1>${item.book.title}</h1>

            <p>${item.book.author}</p>
            <small>${item.book.isbn}</small><br />
            <small>Price: €${item.book.price}</small><br />
            <a type="button" onclick="delFromCart('${item.book.id}')">Remove</a><br>

            <a type="button" style="color:blue">Save for later</a>
          </div>
        </div></td><td>

        <p>${item.quantity}</p>
      </td>
      <td>€ ${partial}</td></tr>`;

      let container = document.getElementById("table-data-product");
      if (container != null) {
        let c = container.innerHTML;
        html = c + html;
        container.innerHTML = html;
      }
    });

    let s = total - (total * 22) / 100;
    s = Math.round((s + Number.EPSILON) * 100) / 100;

    let t = (total * 22) / 100;
    t = Math.round((t + Number.EPSILON) * 100) / 100;

    let h = `<tr><td>Subtotal:</td><td>€ ${s}</td></tr><tr><td>Tax (22%):</td><td>€ ${t}</td></tr><tr><td>Total:</td><td>€ ${total}</td></tr>`;
    let container = document.getElementById("total-price");
    if (container != null) {
      container.innerHTML = h;
    }
    if (res.status !== 200) {
      alert("Error code: " + res.status + "\nMessage: " + (await res.text()));
    }
  } catch (error) {
    console.log(error);
  }
};
getCart();
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

const delFromCart = async function (i) {
  var email = sessionStorage.getItem("email");
  var password = sessionStorage.getItem("password");

  var credential =
    sessionStorage.getItem("email") + ":" + sessionStorage.getItem("password");
  credential = btoa(credential);
  let headers = new Headers();
  headers.append("Authorization", "Basic " + credential);

  let url_mod =
    "http://127.0.0.1:8080/users/secured/remove-from-cart/" +
    btoa(email) +
    "/" +
    btoa(i);

  try {
    let res = await fetch(url_mod, {
      method: "DELETE",
      headers: headers,
    });
    if (res.status !== 200) {
      alert("someting went wrong with acces");
    }
    console.log(res.status);
    document.location.reload();
  } catch (error) {
    alert(error);
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

const set = async function (i, j) {
  var email = sessionStorage.getItem("email");
  var password = sessionStorage.getItem("password");

  var credential =
    sessionStorage.getItem("email") + ":" + sessionStorage.getItem("password");
  credential = btoa(credential);
  let headers = new Headers();
  headers.append("Authorization", "Basic " + credential);

  let url_mod =
    "http://127.0.0.1:8080/users/secured/remove-from-cart/" +
    btoa(email) +
    "/" +
    btoa(i) +
    "/" +
    j;
  console.log(url_mod);
  try {
    let res = await fetch(url_mod, {
      method: "PUT",
      headers: headers,
    });
    if (res.status !== 200) {
      alert("someting went wrong with acces");
      return;
    }
    document.location.reload();
  } catch (error) {
    alert(error);
  }
};

const purchase = async function () {
  var email = sessionStorage.getItem("email");
  var password = sessionStorage.getItem("password");

  var credential =
    sessionStorage.getItem("email") + ":" + sessionStorage.getItem("password");
  credential = btoa(credential);
  let headers = new Headers();
  headers.append("Authorization", "Basic " + credential);

  let url_mod = "http://127.0.0.1:8080/users/secured/purchase/" + btoa(email);

  try {
    let res = await fetch(url_mod, {
      method: "POST",
      headers: headers,
    });

    if (res.status !== 200) {
      alert("Error code: " + res.status + "\nMessage:\n" + (await res.text()));
    }
    document.location.reload();
  } catch (error) {
    alert(error);
  }
};

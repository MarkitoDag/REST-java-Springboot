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

const showBookDetail = async function () {
  let isbn = sessionStorage.getItem("isbn");
  isbn = isbn.toString().substring(1);
  const url = `http://127.0.0.1:8080/books/${isbn}`;

  try {
    let res = await fetch(url, { method: "GET" });
    const data = await res.json();

    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    let html = "";

    let htmlSegment = `
    <label for="image"><b>Image URL</b></label>
      <input
        type="text"
       value='${data.image}'
        id="image"
        name="image"
        required
      />
       <ul class="detail-view-div2"><img src="${data.image}" class="book-detail-image" width= 125px>
      <div class ="edit">
      
      <label for="title"><b>Title</b></label>
      <input
        type="text"
       value='${data.title}'
        id="title"
        name="title"
        required
      />
 
    <div class="internal-div">
    <label for="author"><b>Author</b></label>
    <input
      type="text"
     value='${data.author}'
      id="author"
      name="author"
      required
    />
    <label for="publisher"><b>Publisher</b></label>
    <input
      type="text"
     value='${data.publisher}'
      id="publisher"
      name="publisher"
      required
    />
    <label for="isbnNew"><b>ISBN</b></label>
    <input
      type="text"
     value='${data.isbn}'
      id="isbnNew"
      name="isbnNew"
      required
    />
    <label for="dop"><b>Date of published</b></label>
    <input
      type="text"
     value='${data.date}'
      id="dop"
      name="dop"
      required
    />
    <label for="stock"><b>Left in Stock</b></label>
    <input
      type="number"
     value='${data.quantity}'
      id="stock"
      name="stock"
      required
    />
    <label for="price"><b>Price</b></label>
    <input
      type="float"
     value='${data.price}'
      id="price"
      name="price"
      required
    />
    <label for="oPrice"><b>List Price</b></label>
    <input
      type="text"
     value='${data.original_price}'
      id="oPrice"
      name="oPrice"
      required
    />

    <label for="description"><b>Description</b></label>
    <textarea
      id="description"
      name="description"
      cols="70"
      rows="15"
      required
    > ${data.description}</textarea>
    </div>
    <button type='button' class ="button-detail" style="color:white" onclick="save()">
    Save
    </button>
      </div>
    
      </ul>`;

    html += htmlSegment;
    let container = document.querySelector(".container-edit");

    container.innerHTML = html;
  } catch (error) {
    alert(error);
  }
};

showBookDetail();
var credential =
  sessionStorage.getItem("email") + ":" + sessionStorage.getItem("password");
credential = btoa(credential);
let headers = new Headers();
headers.append("Authorization", "Basic " + credential);
console.log(headers.get("Authorization"));
const save = async function () {
  let isbn2 = sessionStorage.getItem("isbn");
  isbn2 = isbn2.toString().substring(1);
  let url_mod = "http://127.0.0.1:8080/books/admin/mod_book/" + isbn2;

  const image = document.getElementById("image").value;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const publisher = document.getElementById("publisher").value;
  const isbnNew = document.getElementById("isbnNew").value;
  const dop = document.getElementById("dop").value;
  const stock = document.getElementById("stock").value;
  const price = document.getElementById("price").value;
  const oPrice = document.getElementById("oPrice").value;
  const description = document.getElementById("description").value;

  //   image = image.value.toString();
  //   title = title.value.toString();
  //   author = author.value.toString();
  //   publisher = publisher.value.toString();
  //   isbnNew = isbnNew.value.toString();
  //   dop = dop.value.toString();
  //   stock = stock.value.toString();
  //   price = price.value.toString();
  //   oPrice = oPrice.value.toString();
  //   description = description.value.toString();
  try {
    let res = await fetch(url_mod, {
      method: "POST",
      headers: {
        Authorization: credential,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isbn: isbnNew,
        author: author,
        title: title,
        price: price,
        description: description,
        original_price: oPrice,
        quantity: stock,
        date: dop,
        publisher: publisher,
        image: image,
      }),
    });
    console.log(res.headers.toString());
    if (res.status === 201) {
      alert("done!/n");
    } else {
      alert("someting went wrong!");
    }
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

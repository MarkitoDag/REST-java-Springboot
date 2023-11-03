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
document.getElementById("newAdmin").style.fontWeight = "bold";
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
const nemail = document.getElementById("email");
const npassword = document.getElementById("psw");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const userName = document.getElementById("userName");
var credential =
  sessionStorage.getItem("email") + ":" + sessionStorage.getItem("password");
credential = btoa(credential);
let headers = new Headers();
headers.append("Authorization", "Basic " + credential);
const save = async function () {
  let url_mod = "http://127.0.0.1:8080/users/admin/create_new_admin";

  try {
    let res = await fetch(url_mod, {
      method: "POST",
      headers: {
        Authorization: credential,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: nemail.value.toString(),
        password: npassword.value.toString(),
        firstName: firstName.value.toString(),
        lastName: lastName.value.toString(),
        userName: userName.value.toString(),
        age: age.value,
      }),
    });
    if (res.status === 202) {
      alert("done!");
      document.location.href = "manage.html";
    } else {
      alert(
        "code of error:" + res.status + "\nSomething went wrong.  Please retry!"
      );
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
  
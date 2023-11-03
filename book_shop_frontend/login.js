const email = document.getElementById("email");
const password = document.getElementById("psw");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const userName = document.getElementById("userName");
const age = document.getElementById("age");
const confirmPassword = document.getElementById("confirmPassword");
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
const postSignUp = async function () {
  if (confirmPassword == password) {
    alert("le password non coincidono");
    return;
  }
  try {
    let res = await fetch("http://127.0.0.1:8080/users/create_new_user", {
      method: "POST",
      body: JSON.stringify({
        email: email.value.toString(),
        password: password.value.toString(),
        firstName: firstName.value.toString(),
        lastName: lastName.value.toString(),
        userName: userName.value.toString(),
        age: age.value,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status === 202) {
      document.location.href = "login.html";
    } else {
      alert("Completa tutti i campi in modo corretto.");
      return;
    }
  } catch (e) {
    alert(e);
  }
};
const postLogin = async function () {
  try {
    let res = await fetch("http://127.0.0.1:8080/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: email.value.toString(),
        password: password.value.toString(),
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      sessionStorage.setItem("isAdmin", await res.text());
      sessionStorage.setItem("email", email.value.toString());
      sessionStorage.setItem("password", password.value.toString());
      document.location.href = sessionStorage.getItem("page");
    } else {
      alert("email o password non corrette.");
      return;
    }
  } catch (e) {
    alert(e);
  }
};

//postLogin();

function dangNhap() {
  $.ajax({
    url: "/api/user/dangNhap",
    type: "post",
    data: { username: $(".username").val(), password: $(".password").val() },
  })
    .then((data) => {
      if (data.token) {
        setCookie("user", data.token, 30);
        window.location.href = "/";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

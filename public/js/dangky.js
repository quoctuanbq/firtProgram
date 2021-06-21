function dangky() {
  $.ajax({
    url: "/api/user",
    type: "post",
    data: { username: $(".username").val(), password: $(".password").val() },
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

render();

function xoa(x) {
  $.ajax({
    url: "/api/todo/" + x,
    type: "DELETE",
  })
    .then((data) => {
      render();
    })
    .catch((err) => {
      console.log(err);
    });
}

function them() {
  $.ajax({
    url: "/api/todo",
    type: "POST",
    data: {
      ten: $(".ten").val(),
    },
  })
    .then((data) => {
      if (data.status === 200) {
        render();
        $(".ten").val("");
      }
      $(".noti").html(data.mes);
    })
    .catch((err) => {
      console.log(err);
    });
}

function sua(id) {
  $(".updateInput").remove();
  let input = `
  <div class='updateInput'>
    <input type="text" class='newName'>
    <button onclick='update("${id}")'>xác nhận</button>
  </div>
  `;

  $(`#${id}`).append(input);
}

function update(id) {
  $.ajax({
    url: "/api/todo/" + id,
    type: "PUT",
    data: { ten: $(".newName").val() },
  })
    .then((data) => {
      console.log(data);
      render();
    })
    .catch((err) => {
      console.log(err);
    });
}

function render() {
  $(".list").html("");
  $.ajax({
    url: "http://localhost:3000/api/todo",
    type: "GET",
  })
    .then((data) => {
      console.log(data);
      data.map((ele) => {
        let checked = "";
        if (ele.hoanThanh) {
          checked = "checked";
        }
        let div = `
        <div id = "${ele._id}" >
          <div class='task'>
            <div class='name'>${ele.ten} </div>
            <input type="checkbox" name="" id="" ${checked}> </input>
            <button onclick='sua("${ele._id}")'>Sua</button> 
            <button onclick='xoa("${ele._id}")'> X </button>
          </div>
        </div>
        `;
        $(".list").append(div);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function addCheckBox() {
  renderWithCheckBox();
  // $.ajax({
  //   url: "/api/todotest/deleteMany",
  //   type: "DELETE",
  //   data: { list: [1, 3, 5, 4, 9, 8, 7, 6, 5] },
  // })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}

function renderWithCheckBox() {
  $(".list").html("");
  $.ajax({
    url: "http://localhost:3000/api/todo",
    type: "GET",
  })
    .then((data) => {
      console.log(data);
      data.map((ele) => {
        let checked = "";
        if (ele.hoanThanh) {
          checked = "checked";
        }
        let div = `
        <div id = "${ele._id}" >
          <div class='task'>
            <div class='name'>${ele.ten} </div>
            <input type="checkbox" name="" id="" ${checked}> </input>
            <button onclick='sua("${ele._id}")'>Sua</button> 
            <button onclick='xoa("${ele._id}")'> X </button>
            <div><input type="checkbox" name="" id="" class='check${ele._id} deleteManyCheckBox'> </input></div>
          </div>
        </div>
        `;
        $(".list").append(div);
      });
      $(".deleteManyButton").remove();
      let deleteMany = `
      <button onclick='deleteChecked()' class='deleteManyButton'>Xoa bản ghi đã chọn</button>
      `;
      $(".deleteManyGroup").append(deleteMany);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteChecked() {
  let checkBoxList = $(".deleteManyCheckBox");
  let idList = [];
  for (let i = 0; i < checkBoxList.length; i++) {
    if (checkBoxList[i].checked == true) {
      let inputClass = $(checkBoxList[i]).attr("class").slice(5, 29);
      idList.push(inputClass);
    }
  }

  $.ajax({
    url: "/api/todo/deleteMany",
    type: "DELETE",
    data: { list: idList },
  })
    .then((data) => {
      console.log(data);
      $(".deleteManyButton").remove();
      render();
    })
    .catch((err) => {
      console.log(err);
    });
}
// function uniCharCode(event) {
//   var char = event.which || event.keyCode;
//   console.log(char);
// }

function uniKeyCode(event) {
  var key = event.keyCode;
  console.log(key);
  if (key == 13) {
    them();
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

console.log(getCookie("user"));

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

console.log(getCookie('user'));

$.ajax({
  url: "/api/user/checkCookie",
  type: "POST",
})
  .then((data) => {
    console.log(data);
    if (data != "da dang nhap") {
      window.location.href = "/dangnhap";
    }
  })
  .catch((err) => {
    console.log(err);
    window.location.href = "/dangnhap";
  });

function signOut() {
  $.ajax({
    url: '/api/blackList/',
    type: 'POST'
  }).then(data => {
    console.log(data);
    if (data == 'đăng xuất thành công') {
      delete_cookie('user')
      window.location.href = "/dangnhap";
    }
  }).catch(err => {
    console.log(err);
  })
}

function delete_cookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
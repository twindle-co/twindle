$("form").on("submit", function (event) {
  event.preventDefault();
  var form = $(this);
  const action = form.attr("action");
  var email = $("email").val();
  console.log(form.serialize());

  $.ajax({
    type: "POST",
    url: action,
    data: form.serialize(),
    dataType: "json",
    statusCode: {
      0: function () {
        $("form")[0].reset();
        $(".contact__status").html("Thank you for being part of <strong>Twindle</strong> family ! <br>You wil be the first one to know about new releases!!!");
      },
      200: function () {
        $("form")[0].reset();
        $(".contact__status").html("Email Subscribe Successfully !!!");
      },
    },
    // contentType: "application/json; charset=utf-8",
    success: function (data) {
      //var ms = data['msg'];
      if (data["result"] != "success") {
        $("#FailureMsg").html("Mail not sent, Something went Wrong!");

      } else {
        $("form")[0].reset();
        $(".contact__status").html("Email Subscribe Successfully !!!");
      }
    },
    error: function (err) {
      $(".contact__status").html(
        "Could not connect to the registration server. Please try again later!" +
          JSON.stringify(err)
      );
    },
  });
});

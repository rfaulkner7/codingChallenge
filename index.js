const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

admin.initializeApp();
const app = express();

var accountSid = "AC5d65690971729ffd9c536eecca67cfd6";
var authToken = "add1f861dcc6067890dd601de0ef69d0";

app.use(cors({ origin: true }));

app.get("/timestamp", (request, response) => {
  response.send("hi");
});

app.get("/timestamp2", (request, response) => {
  var x = request.query;
  response.send(x["phone"]);
});

app.get("/new", (request, response) => {
  ref.update({
    "4782441449/code": "58795"
  });
});

app.get("/authorize", (request, response) => {
  var phone = request.query["phone"];
  var code = request.query["code"];
  var usersRef = ref.child("/" + phone);
  usersRef.on("value", function(snapshot) {
    try {
      var realCode = snapshot.val()["code"];
      if (code == realCode) {
        response.send(true);
      } else {
        response.send(false);
      }
    } finally {
      response.send(false);
    }
  });
});

app.get("/genCode", (request, response) => {
  var phone = request.query["phone"];
  //   ref.update({ phone: phone });
  var phoneRef = ref.child("/" + phone);
  var random = Math.round(Math.random() * 999999);
  // var client2 = new twilio(accountSid, authToken);
  // client2.messages.create({
  //   body: "hey",
  //   to: "+14782441449",
  //   from: "+14783134883"
  // });
  phoneRef.update({ code: random });
  response.send("" + random);
  //   ref.update({
  //     phone: {
  //       code: "random"
  //     }
  //   });
  //   ref.update()
  //   response.send("random");
  //   var usersRef = ref.child("/" + phone);
  //   usersRef.on("value", function(snapshot) {
  //     var code = snapshot.val()["code"];
  //     response.send(code);
  //   });
});

exports.app = functions.https.onRequest(app);

var db = admin.database();
var ref = db.ref("server/logins/users");

// var usersRef = ref.child("/4782441449");

//creating

// usersRef.set({
//   "4782441449": {
//     code: "123456"
//   }
// });

//updating

// usersRef.update({
//   "4782441449/code": "121212"
// });

//generates new key

// usersRef.push({
//   "1234567890": {
//     code: "123124"
//   }
// });

//read db value

// usersRef.on(
//   "value",
//   function(snapshot) {
//     console.log(snapshot.val());
//   },
//   function(errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   }
// );

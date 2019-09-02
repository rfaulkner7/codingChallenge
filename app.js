var express = require("express");
var app = express();
const twilio = require("twilio");
var cors = require("cors");

var accountSid = "AC5d65690971729ffd9c536eecca67cfd6";
var authToken = "add1f861dcc6067890dd601de0ef69d0";
var client = new twilio(accountSid, authToken);

app.use(cors());

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

app.get("/message", (req, res, next) => {
    var id;
    var msg = req.query["msg"];
    var phone = req.query["phone"];
  client.messages
    .create({
      body: "" + msg,
      to: "+1" + phone,
      from: "+14783134883"
    })
    .then(message => res.send(message.sid));
});

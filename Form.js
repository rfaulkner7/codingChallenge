import React from "react";
import "./App.css";
// const twilio = require("twilio");

// var accountSid = "AC5d65690971729ffd9c536eecca67cfd6";
// var authToken = "add1f861dcc6067890dd601de0ef69d0";
// var client = new twilio(accountSid, authToken);

const https = require("https");
const http = require("http");

export default class Form extends React.Component {
  state = {
    phone: "",
    code: ""
  };

  onSubmit = e => {
    var url;
    var bod;
    if (this.state.code === "" && this.state.phone !== "") {
      e.preventDefault();
      // console.log(this.state.phone);zsa
      url =
        "https://us-central1-codingchallenge-3057f.cloudfunctions.net/app/genCode?phone=" +
        this.state.phone;
      https.get(url, resp => {
        resp.setEncoding("utf8");
        let body = "";
        resp.on("data", data => {
          body += data;
        });
        resp.on("end", () => {
          // body = JSON.parse(body);
          bod = body;
          setTimeout(this.sendMsg(this.state.phone, bod), 1000);
          // client.messages.create({
          //   body: "hey",
          //   to: "+14782441449",
          //   from: "+14783134883"
          // });
        });
      });
    } else if (this.state.code !== "" && this.state.phone !== "") {
      e.preventDefault();
      url =
        "https://us-central1-codingchallenge-3057f.cloudfunctions.net/app/authorize?phone=" +
        this.state.phone +
        "&code=" +
        this.state.code;
      https.get(url, resp => {
        resp.setEncoding("utf8");
        let body = "";
        resp.on("data", data => {
          body += data;
        });
        resp.on("end", () => {
          // body = JSON.parse(body);
          console.log(body);
        });
      });
    }
  };

  render() {
    return (
      <form className="container">
        <div className="center">
          <div className="field">
            <input
              placeholder="Phone Number"
              value={this.state.phone}
              onChange={e => this.setState({ phone: e.target.value })}
            ></input>
          </div>
          <div className="field">
            <input
              placeholder="Verification Code"
              value={this.state.code}
              onChange={e => this.setState({ code: e.target.value })}
            ></input>
          </div>
          <div>
            <button onClick={e => this.onSubmit(e)}> Submit </button>
          </div>
        </div>
      </form>
    );
  }

  sendMsg(phone, message) {
    var url2 =
      "http://localhost:3001/message?phone=" + phone + "&msg=" + message;
    http.get(url2, resp => {
      resp.setEncoding("utf8");
      let body2 = "";
      resp.on("data", data => {
        body2 += data;
      });
      resp.on("end", () => {
        console.log(body2);
      });
    });
  }
}

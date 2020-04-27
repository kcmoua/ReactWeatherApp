import React, { Component } from "react";
import Moment from "moment";
import "moment-timezone";
import tz from "zipcode-to-timezone";
import './App.css';

class App extends Component {

  state = {};

  getTime = () => {  // function to get time from the zipcode
    let timeZone = tz.lookup(this.state.zip);
    let time = Moment().tz(timeZone).format("h:mm:ss a");
    this.setState({  // set state values
      time: time,
    });
  };

  fetchWeather = () => {
    let zipCode = document.getElementById("zip").value;  // set input value to a variable
    console.log(zipCode);  // log input to the console
    fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&appid=569c92bb68ebf620a1a5106b1e8fccac")  // establish connection to the API
      .then((response) => {
        if (response.status !== 200) {  // check for connection error
          console.log("Status Code: " + response.status);
          return;
        }
        response.json().then((data) => {
          console.log(data);
          this.setState({  // set state values
            zip: zipCode,
            temp: data.main.temp,
            city: data.name,
            timezone: data.timezone,
          });
          this.getTime();  // after fetching the data, run the getTime function to get the time for the zipcode
        });
      })
      .catch((err) => {  // console log errors if there are any
        console.log("Error: " + err);
      });
  };

  render() { // render html elements onto the page
    return (
      <div>
        <input type="text" id="zip" placeholder="Enter ZipCode" />
        <button onClick={this.fetchWeather}>
          Submit
        </button>
        <p>{this.state.zip}</p>
        <p>{this.state.temp}</p>
        <p>{this.state.city}</p>
        <p>{this.state.time}</p>
      </div>
    );
  }
}

export default App;
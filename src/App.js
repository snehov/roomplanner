import React, { Component } from 'react';
//import CalendarInfinite from "./Calendar/CalendarInfinite";
import Calendar from "./Calendar/Calendar";
//import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <CalendarInfinite /> */}
          <hr />
          <Calendar/>         
        </header>
      </div>
    );
  }
}

export default App;

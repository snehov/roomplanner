import React, { Component } from 'react';
//import CalendarInfinite from "./Calendar/CalendarInfinite";
//import Calendar from "./Calendar/Calendar";
import CalendarIncl from "./Calendar/CalendarIncl";
//import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <CalendarInfinite /> */}
          <hr />
          {/* <Calendar/>     */}  
            <CalendarIncl/>  
        </header>
      </div>
    );
  }
}

export default App;

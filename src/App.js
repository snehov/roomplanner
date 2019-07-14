import React, { Component } from 'react';
//b import CalendarInfinite from "./Calendar/CalendarInfinite";
//import Calendar_from_node from "./Calendar/Calendar_from_node_modules";
import Calendar from "./Calendar/Calendar";
//import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
           {/* <CalendarInfinite />  */}
          <hr />
          {/* <Calendar_from_node/>     */}  
           <Calendar/>  
        </header>
      </div>
    );
  }
}

export default App;

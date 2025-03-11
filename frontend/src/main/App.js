import React from "react";
import Routes from "./routes";
import Navbar from "../components/navbar";

import "toastr/build/toastr.min.js";
import "../custom.css";
import "toastr/build/toastr.min.js";
import "toastr/build/toastr.css";

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div>
          <Routes />
        </div>
      </>
    );
  }
}

export default App;

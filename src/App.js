import './App.css';
import React, { useState, useEffect } from "react";
import Nav from './components/Nav';
import Banner from './components/Banner';
import Row from './components/Row';
import requests from "./api/requests"
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />

      <Row
        title="Netflix Originals"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row
        title="Trending Now"
        id="TR"
        fetchUrl={requests.fetchTrending}
      />
      <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />

      <Footer />
    </div>
  );
}

export default App;
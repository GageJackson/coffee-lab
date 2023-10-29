import React from 'react';
import './App.css';
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import {Footer} from "./layouts/NavbarAndFooter/Footer";
import {HomePage} from "./layouts/HomePage/HomePage";
import {SearchCoffeesPage} from "./layouts/SearchCoffeesPage/SearchCoffeesPage";

export const App = () => {
  return (
      <>
        <Navbar/>
        {/*<HomePage/>*/}
          <SearchCoffeesPage/>
        <Footer/>
      </>
  );
}
import React from 'react';
import './App.css';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import Footer from './layouts/NavbarAndFooter/Footer';
import HomePage from './layouts/HomePage/HomePage';
import SearchBooksPage from './layouts/SearchBooks/SearchRecordsPage';

export function App() {
  return (
    <>
      <Navbar />
        {/* <HomePage /> */}
        <SearchBooksPage />
      <Footer />
    </>
  );
}

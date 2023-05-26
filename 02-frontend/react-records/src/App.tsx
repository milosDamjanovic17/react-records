import React from 'react';
import './App.css';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import Footer from './layouts/NavbarAndFooter/Footer';
import HomePage from './layouts/HomePage/HomePage';
import SearchBooksPage from './layouts/SearchBooks/SearchRecordsPage';
import { Redirect, Route, Switch } from 'react-router-dom';

export function App() {
  return (
    <>
      <Navbar />
      <Switch>
      <Route path='/' exact>
        <Redirect to='/home' />
      </Route>
      <Route path='/home'>
        <HomePage />
      </Route>
      <Route path='/search'>
        <SearchBooksPage />
      </Route>
      </Switch>
      <Footer />
    </>
  );
}

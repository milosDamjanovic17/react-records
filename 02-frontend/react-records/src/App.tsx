import React from 'react';
import './App.css';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import Footer from './layouts/NavbarAndFooter/Footer';
import HomePage from './layouts/HomePage/HomePage';
import SearchBooksPage from './layouts/SearchBooks/SearchRecordsPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import RecordCheckoutPage from './layouts/RecordCheckoutPage/RecordCheckoutPage';

export function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
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
        <Route path='/checkout/:recordId'>
          <RecordCheckoutPage />
        </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

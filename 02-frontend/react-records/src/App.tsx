import React from 'react';
import './App.css';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import Footer from './layouts/NavbarAndFooter/Footer';
import HomePage from './layouts/HomePage/HomePage';
import SearchRecordsPage from './layouts/SearchRecords/SearchRecordsPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import RecordCheckoutPage from './layouts/RecordCheckoutPage/RecordCheckoutPage';
import oktaConfig from './lib/oktaConfig';
import {OktaAuth, toRelativeUrl} from '@okta/okta-auth-js'
import { LoginCallback, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';

const oktaAuth = new OktaAuth(oktaConfig);

export function App() {

  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  }

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin))
  }



  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
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
            <SearchRecordsPage />
          </Route>
          <Route path='/checkout/:recordId'>
            <RecordCheckoutPage />
          </Route>
          <Route path='/login' render={() => <LoginWidget config={oktaConfig}/>} />
          <Route path='/login/callback' component={LoginCallback}/>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}

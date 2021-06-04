import '../styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createStore, applyMiddleware } from "redux";
import allReducers from '../redux/reducers';
import {Provider} from 'react-redux';
import React, { useState, useEffect } from "react";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const client = new ApolloClient({
  uri: "https://swiftpwa-be.testingnow.me/graphql",
  fetchOptions: {
    mode: 'no-cors',
  },
  cache: new InMemoryCache(),
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4A2E82'
    }
  }
});

function MyApp({ Component, pageProps }) {

  const middlewares = applyMiddleware(thunk);

  const ISSERVER = typeof window === "undefined";

  // const persistedState = localStorage.getItem('reduxState') 
  // ? JSON.parse(localStorage.getItem('reduxState'));
  
  const store = createStore(
    allReducers,
    undefined,
    composeWithDevTools(middlewares)
    );


  

  useEffect(()=> {
    console.log("App Mounted");
    store.subscribe(()=>{
      localStorage.setItem('reduxState', JSON.stringify(store.getState()))
    })
  
    return function cleanup() {
      console.log("App Unmounted");
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
          <Component {...pageProps} />
          </div>
        </MuiThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp

import React, { useState, useEffect } from "react";
import Head from 'next/head'
import { useQuery, gql } from "@apollo/client";
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../redux/actions';

import Link from 'next/link';
import Card from '../components/card';
import Layout from '../components/layout';
import Nav from '../components/nav';
import Button from '@material-ui/core/Button';

export default function App(props) {

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const HOMEPAGE = gql`
    {
      cmsPage (identifier:"home-page-v1"){
        content
        title
        url_key
      }
    }
    `;
  
  const res = useQuery(HOMEPAGE);
  if (res.loading) {
    return <div className="loading-modal">loading...</div>;
  }
  if (res.error) {
    return <div className="loading-modal"><span>{console.log(res.error)}<h1>Something went wrong!</h1><small>{res.error.toString()}</small></span></div>;
  }

  useEffect(()=> {
    console.log("App Mounted");

    return function cleanup() {
      console.log("App Unmounted");
    }
  }, [])

  const homepage = res.data;

  return (
    <div className="container">
      <Head>
        <title>Home</title>
      </Head>
      <main>
      <Nav />
      <section id="section-product">
        <div className="cmsPageHomepage" dangerouslySetInnerHTML={{__html: homepage.content}}></div>
      </section>
      </main>
    </div>
  )
}
import { useRouter } from 'next/router'
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Head from 'next/head'
import Nav from '../../components/nav';
import Card from '../../components/card';
import AddIcon from '@material-ui/icons/AddCircle';
import InfoIcon from '@material-ui/icons/Info';
import Skeleton from '@material-ui/lab/Skeleton';



const CategoryByID = () => {
    const router = useRouter();
    
    const CATEGORY = gql`
    {
      category(id:${router.query.id}){
        id
        name
        level
        description
      }
    }
    `;
    const PRODUCT_LIST = gql`
    {
      products (pageSize:20, filter: {category_id: {eq: "${router.query.id}"}}) {
        items {
          id
          name
          brand
          url_key
          categories {
            name
          }
          sku
          image {
            url
          }
          price_range {
            maximum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
              discount {
                percent_off
              }
            }
            minimum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
              discount {
                percent_off
              }
            }
          }
      }
      }
    }
    `;

    const res1 = useQuery(CATEGORY);
    const res2 = useQuery(PRODUCT_LIST);

    if (res2.loading) {
        return <div className="loading-modal">loading...</div>;
    }
    if (res2.error) {
      return <div className="loading-modal"><h1>Something went wrong!</h1><br></br><small>{res2.error.toString()}</small></div>;
    }

    const category = res1.data.category;
    const products = res2.data.products.items;

    return (
        <div className="container">
          <Head>
            <title>{category.name}</title>
          </Head>
          <main>
          <Nav />
          <div className="page-title">
            <span className="span-title">{category.name}</span><br/>
            <span className="span-desc">{category.desc}</span> <br/>
          </div>
        
          <div className="product-list-container">
            { products.map((val, idx) => {
              let link = "/product/" + val.url_key;
              return (
                <Card className="product-card" key={val.id}>
                  <Link href={link}>
                    <div className="product-image-container">
                      <img className="product-image" src={val.image.url}></img>
                    </div>
                  </Link>
                  <div className="product-info">
                    <Link href={link}>
                        <div className="product-name"> {val.name}</div>
                    </Link>
                    <div className="product-price"> {val.price_range.maximum_price.final_price.currency + "" + val.price_range.maximum_price.final_price.value}</div>
                    
                    <div className="product-buttons">
                      <Link href={ link }>
                        <InfoIcon/>
                      </Link>
                      <AddIcon onClick={()=> {
                        alert(val.name + " has been added to cart");
                      }}></AddIcon>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          </main>
          <style global jsx>{
              `
                .product-list-container {
                  display:flex;
                  width:100%;
                  justify-content:flex-start;
                  flex-wrap:wrap;
                  justify-content:center;
                }
                .product-list-container .card{
                  width:20%;
                  margin:1rem;
                  box-shadow: 0.1rem 0.1rem 0.5rem #3338;
                }
                .product-list-container .card:hover {
                  width:20%;
                  margin:1rem;
                  box-shadow: 0.25rem 0.25rem 1rem #3338;
                }
                .product-list-container .card .product-image-container{
                  transition: 0.25s all ease;
                  overflow:hidden;
                }
                .product-list-container .card:hover .product-image-container {
                  box-shadow: 0px 0px 5px 5px inset #fff;
                }
                .product-list-container .card img {
                  transition: transform 0.25s ease;
                  z-index:-1;
                }
                .product-list-container .card:hover img{
                  transform:scale(1.2);
                }
                .card .product-image-container {
                  cursor:pointer;
                }
              `}

          </style>
        </div>);
};

export default CategoryByID;
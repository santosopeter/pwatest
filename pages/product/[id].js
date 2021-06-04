import { useRouter } from 'next/router'
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Head from 'next/head'
import {useSelector, useDispatch} from 'react-redux';
import {addProduct, removeProduct} from '../../redux/actions';

import Nav from '../../components/nav';
import Card from '../../components/card';
import HomeIcon from '@material-ui/icons/Home';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const ProductByID = () => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [selectedTab, setSelectedTab] = React.useState(0);

    function incQty(n) {
        setQuantity(quantity + n);
    }
    function decQty(n) {
        if (quantity > 1) {
            setQuantity(quantity - n);
        }
    }

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const [pageName, setPageName] = useState(0);
    
    const PRODUCT = gql`
    {
        products (filter: {url_key: {eq: "${router.query.id}"}}) {
            items {
                id
                name
                brand
                url_key
                description {
                    html
                }
                more_info {
                    label
                    value
                }
                review {
                    rating_summary
                    reviews_count
                }
                reviews(pageSize:5, currentPage:1) {
                    items {
                    nickname
                    summary
                    average_rating
                    text
                    }
                }
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
    const { loading, error, data } = useQuery(PRODUCT);

    if (loading) {
        return <div className="loading-modal">loading...</div>;
    }
    if (error) {
        return <div className="loading-modal"><h1>Something went wrong!</h1><br></br><small>{res2.error.toString()}</small></div>;
    }
    
    const product = data.products.items;

    return (
        <div className="container">
          <main>
          <Nav />

            { product.map((val, idx) => {
                return (<div key={idx}>
                    <Head>
                        <title> {val.name} </title>
                    </Head>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                        <span> 
                            {val.name}
                        </span>
                    </div>
                    <div className="product-container">
                        <div className="product-image" draggable="true">
                            <img className="product-image-content" src={val.image.url} />
                        </div>
                        <div className="product-data">
                            <div className="product-name">{val.name}</div>
                            <div className="product-sku">{"SKU#: "+val.sku}</div>
                            <div className="product-review stars"><span>{ parseFloat((val.review.rating_summary/100)*5).toPrecision(2) }</span><StarIcon/></div>
                            <div className="product-price">{val.price_range.maximum_price.final_price.currency+val.price_range.maximum_price.final_price.value}</div>
                            <div className="product-buttons">
                                <Button variant="contained" color="primary">
                                    <FavoriteIcon />
                                </Button>
                                <TextField id="outlined-basic" label="Quantity" variant="outlined" type="number" onChange={(e) => {setQuantity(e.target.value)}} value={quantity}/>
                                
                                <Button variant="contained"  color="primary" onClick={() => {
                                    dispatch(
                                        addProduct(
                                            {
                                                id:val.id,
                                                name:val.name,
                                                price:val.price_range.maximum_price.final_price.value,
                                                qty:quantity
                                            }
                                        )
                                    )
                                }}>
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="product-info">
                        <Tabs value={selectedTab} onChange={handleChange} aria-label="Product Informations">
                            <Tab label="Description" {...a11yProps(0)} />
                            <Tab label="More Info" {...a11yProps(1)} />
                            <Tab label="Review" {...a11yProps(2)} />
                            </Tabs>
                        <TabPanel value={selectedTab} index={0}>
                            <div className="product-desc" dangerouslySetInnerHTML={{__html: val.description.html}}></div>
                        </TabPanel>
                        <TabPanel value={selectedTab} index={1}>
                            <table>
                            {val.more_info.map((mival, miidx) => (
                                <tr key={miidx}>
                                    <td>{mival.label}</td>
                                    <td>:</td>
                                    <td>{mival.value}</td>
                                </tr>
                            ))}
                            </table>
                        </TabPanel>
                        <TabPanel value={selectedTab} index={2}>
                            <table className="reviews-table">
                            { val.reviews.items.length > 0 ? (
                                val.reviews.items.map((reviewsval, reviewsidx) => (
                                    <tr key={reviewsidx}>
                                        <td className="stars"><span>{reviewsval.average_rating}</span><StarIcon/></td>
                                        <td>{reviewsval.nickname}</td>
                                        <td>{reviewsval.text}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td>There's no review yet</td></tr>
                            )

                            }
                            
                            </table>
                        </TabPanel>
                    </div>
                </div>);
            })}
            </main>
            <style global jsx>{
              `
                .breadcrumb, .product-container {
                    width:100%;
                    padding:0 1rem;
                }
                .breadcrumb{
                    display:flex;
                    align-items:center;
                    text-transform:uppercase;
                    font-style:italic;
                    font-size:0.75rem;
                    padding:0.75rem;
                    background:#3331;
                }
                .breadcrumb svg.MuiSvgIcon-root {
                    font-size:0.75rem;
                    margin: 0 0.25rem;
                }
                .product-container {
                    margin-top:2rem;
                    display:flex;
                    justify-content:flex-start;
                    flex-wrap:wrap;
                    justify-content:center;
                    gap:2rem;
                }
                .product-container .product-image,
                .product-container .product-data {
                    flex:1;
                }
                .product-container .product-image {
                    height:50vh;
                    display:grid;
                    place-items:center;
                    overflow:hidden;
                }
                .product-container .product-image-content {
                    max-width:100%;
                    max-height:100%;
                }
                .product-container .product-data .product-name {
                    font-size:2rem;
                }
                .product-container .product-data .product-review {
                    margin-top:1rem;
                }
                .product-container .product-data .product-sku {
                    font-size:0.75rem;
                    opacity:0.8;
                }
                .product-container .product-data .product-price {
                    margin-top:1rem;
                    font-size:1.5rem;
                }
                .product-container .product-buttons {
                    margin-top:1rem;
                    display:flex;
                    flex-directions: row;
                }
                .product-container .product-buttons>*{
                    margin-right:0.5rem;
                }
                .product-container .product-buttons>.button{
                    transition: 0.25s ease;
                    margin-right:1rem;
                    display:grid;
                    place-items:center;
                    padding:1rem;
                    background:#333;
                    fill:#eee;
                    color:#eee;
                    cursor:pointer;
                    border:#333 solid 2px;
                }
                .product-container .product-buttons>.button:hover{
                    border-color:#333;
                    background:#eee;
                    fill:#333;
                    color:#333;
                }
                .product-container select {
                    margin-right:0.25rem;
                    padding: 0.5rem;
                }

                .product-info {
                    margin-top:2rem;
                }
                table td{
                    padding-right:1rem;
                }
                .stars {
                    width:max-content;
                    padding:0.25rem;
                    border-radius:0.25rem;
                    background:#333;
                    color:gold;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }
                table.reviews-table {
                    border-spacing: 0.25rem 0.5rem;
                }
              `}

          </style>
        </div>);
};

export default ProductByID;
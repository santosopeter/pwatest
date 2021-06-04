import Link from 'next/link'
import CartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from "@apollo/client";

const Nav = () => {

    const useStyles = makeStyles((theme) => ({
        ".navButton": {
          backgroundColor: theme.palette.primary.main,
        },
      }));
    const classes = useStyles();

    const CATEGORY_LIST = gql`
    {
      categoryList(filters:{}) {
        id
        name
        level
        url_key
        url_path
        display_mode
        children {
          id
          name
          url_key
          url_path
          display_mode
        }
      }
    }
    `;

    const { loading, error, data } = useQuery(CATEGORY_LIST);

    if (loading) {
    return <div className="loading-modal">loading...</div>;
    }

    if (error) {
    return <div className="loading-modal">Something went wrong!</div>;
    }

    const category = data.categoryList;

    return <nav className="nav-header">
        <div className="nav-menu">
            <Link href="/">
                <a>
                    <img src="/img/takodachi.gif" alt="logo"></img>
                </a>
            </Link>
            <ul className="nav-menu-items">
                <li>
                    <Link href="/">
                    <Button className={classes.navButton} variant="contained" color="primary"><SearchIcon /></Button>
                    </Link>
                </li>
                <li>
                    <Link href="/cart">
                    <Button className={classes.navButton} variant="contained" color="primary"><CartIcon /></Button>
                    </Link>
                </li>
                <li>
                    <Link href="/account">
                    <Button className={classes.navButton} variant="contained" color="primary"><PersonIcon /></Button>
                    </Link>
                </li>
            </ul>

            <style jsx>{
                `
                .nav-menu {
                    width: 100%;
                    padding: 0.5rem;
                    background: #fff;

                    display:flex;
                    flex-direction:row;
                    justify-content:space-around;
                    align-items:center;
                    height:5rem;
                } .nav-menu a {
                    position:relative;
                    height:100%;
                }
                .nav-menu img{
                    max-width: 100%;
                    max-height: 100%;
                }
                ul {
                    list-style-type:none;
                    display:inline-flex;
                    justify-content:flex-end;
                    flex:1;
                }
                li {
                    margin:0.5rem;
                }
                li > :global(a) {
                    display:grid;
                    place-items:center;
                    padding:0.5rem;
                    border-radius:0.25rem;
                    color:#4A2E82;
                    border:solid 2px #4A2E82;
                    transition: 0.25s ease;
                }
                li > :global(a):hover {
                    color:#fff;
                    background:#4A2E82;
                }
                
                `}

            </style>
        </div>
        <ul className="category-list">
            { category.map((val, idx) => {
            // return ((val.level < 3) ? <li key={idx}>{val.name}</li> : "");
            if(val.level < 3) {
                let link = "/category/"+val.id;
                return <li key={val.id}><Link href={link} ><a>{val.name}</a></Link></li>;
            }else {
                return "";
            }
            })}
        </ul>
    </nav>
}

export default Nav;
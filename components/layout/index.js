import Link from 'next/link'

const Layout = () => {
    return <main>
        <ul className="nav-menu">
            <li>
                <Link href="category">Category</Link>
            </li>
            <li>
                <Link href="product">Product</Link>
            </li>
            <li>
                <Link href="account">Account</Link>
            </li>
            <li>
                <Link href="test">Test</Link>
            </li>
            </ul>
            <style jsx>{
                `ul {
                    list-style-type:none;
                    display:flex;
                    width:100%;
                }
                li {
                    margin:0.5rem;
                }
                li > :global(a) {
                    display:block;
                    width:100%;
                    height:100%;
                    padding:0.5rem;
                    border-radius:0.5rem;
                    background:#333;
                    color:#fff;
                }
                li > :global(a):hover {
                    background:#666;
                }
                
                `}

            </style>
    </main>
}

export default Layout;
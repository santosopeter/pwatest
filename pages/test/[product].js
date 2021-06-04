import { useRouter } from 'next/router'

const CategoryProductDynamicPage = () => {
    const router = useRouter();

    return <div>
            category = { router.query.category } <br/>
            product = { router.query.product } <br/>
        </div>;
};

export default CategoryProductDynamicPage;
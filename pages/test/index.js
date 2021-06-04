import { useRouter } from 'next/router'

const CategoryDynamicPage = () => {
    const router = useRouter();

    return <div>category = { router.query.category } </div>;
};

export default CategoryDynamicPage;
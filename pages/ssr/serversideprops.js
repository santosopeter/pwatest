const Page = ( {stars} ) => {
    return <div>Next Stars: {stars}</div>;
}

export async function getServerSideProps(context) {
    const res = await fetch(`https://api.github.com/repos/vercel/next.js`)
    const data = await res.json()
  
    return {
        props: {
            stars: data.stargazers_count,
        },
    };

}

export default Page;
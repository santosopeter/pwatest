const Page = (props) => {
    return <div>contoh static path: {props.url.staticpath}</div>;
}

export async function getStaticProps(context) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
    const data = await res.json()
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: { data }, // will be passed to the page component as props
    }
  }


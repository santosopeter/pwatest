const Card = (props) => {
    return (
      <div className="card" style={{backgroundColor: props.background }}>
  
        <style global jsx>{`
          .card {
            padding: 0.5rem;
            border-radius: 1rem;
            backdrop-filter: blur(4px);
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            transition: 0.25s ease;
            gap:1rem;
            text-align:center;
          }
          .card .product-image-container {
            flex:1;
            display:grid;
            place-items:center;
          }
          .card img {
            max-width:100%;
            max-height:100%;
          }
          td {
            position: relative;
          }
          .card span {
            top:-7px;
            position:absolute;
            width: max-content;
            height: max-content;
            padding:0.5rem;
            border-radius:0.5rem;
            background:#333333;
            color:#fff;
            margin-left:0.5rem;
            fill:#fff;
          }
          button {
            font-size: 1rem;
            width:unset;
            height:unset;
            padding: 0.5rem 1rem;
            border-radius:1rem;
          }
        `}</style>
        {props.children}
      </div>
    )
  }

  export default Card;
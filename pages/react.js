import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { Formik } from 'formik';

function Test(props){
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{props.title}</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        +
      </button>
      <button onClick={() => setCount(count - 1)}>
        -
      </button>
    </>
  )
}

function Rows(props) {
  return (
    <>
      <span>{props.num}</span> 
    </>
  )
}

function Card(props) {
  return (
    <div className="card" style={{backgroundColor: props.background }}>
      <h2 className="card-title">{props.title}</h2>
      <p className="card-desc">{props.desc}</p>

      <style jsx>{`
        .card {
          padding: 1rem;
          border-radius: 1rem;
          backdrop-filter: blur(4px);
          display: grid;
          place-content: center;
          transition: 0.25s ease;
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
          background:#ff3333;
          color:#fff;
          margin-left:0.5rem;
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

export default function App(props) {

  useEffect(()=> {
    console.log("App Mounted");

    return function cleanup() {
      console.log("App Unmounted");
    }
  }, [])

  var rows = [];
  for (var i = 0; i < 10; i++) {
    rows.push(<Rows key={i} num={i} />);
  }

  return (
    <div className="App">
      <section>
        <Test title="TEEEEEEEEEEST" />
        <div className="rows">
          {rows}
        </div>

        
        <style jsx>{`
          button {
            padding: 1rem;
            border-radius: 50%;
            height: 50px;
            width: 50px;
            border: solid #333 2px;
            font-size: 1.5rem;
            display: grid;
            place-content: center;
            transition: 0.25s ease;
          }
          button:hover {
            filter: brightness(0.9);
          }
        `}</style>

        <Card title="Title 1" desc="lorem ipsum qwlhekqwhjelkqwhelkqwehqwklehqw" background="#33ffff88" />
      </section>
      <br/>
      <section>
        <Card title="Login Card" desc="login right now!" background="#ffaaffbb" >
        <div>
          <h1>{ props.title }</h1>
          <h3>{ props.desc }</h3>
          
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <table>
                  <tr>
                    <td>
                      <label>Email</label>
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {errors.email && touched.email && errors.email ? <span>
                        {errors.email && touched.email && errors.email }
                      </span> : null}
                    </td>
                  </tr>
                  
                  <tr>
                    <td>
                      <label>Password</label>
                    </td>
                    <td>
                      <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <button type="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    </td>
                  </tr>
                </table>
                
              </form>
            )}
          </Formik>
        </div>
      </Card>
      </section>
      
    </div>
  );
}
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import { useRef } from 'react';

function Login() {
  const email = useRef();
  const password = useRef();
  const handleClick = (e) =>{
    
    e.preventDefault();
    console.log(email.current.value)
  }
  return (

    
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src="SocialMoLogo.jpg" alt="login form" className='rounded-start w-100'/>
          </MDBCol>
          <form onSubmit={handleClick}>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <span className="h1 fw-bold mb-0">Communicate Globally</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                <MDBInput wrapperClass='mb-4' label='Email' id='Email' type='email' size="lg" required ref={email}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='Password' type='password' size="lg" required ref={password}/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
              <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p>

              

            </MDBCardBody>
          </MDBCol>
          </form>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;
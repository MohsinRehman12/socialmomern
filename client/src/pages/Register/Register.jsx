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

function App() {
  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src="SocialMoLogo.jpg" alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <span className="h1 fw-bold mb-0">Join Now To Socialize Globally</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign Up</h5>

                <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg"/>
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>
                <MDBInput wrapperClass='mb-4' label='Enter Password Again' id='formControlLg' type='password' size="lg"/>


              <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Register</MDBBtn>
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Already have an account? <a href="#!" style={{color: '#393f81'}}>Login here</a></p>

              

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default App;
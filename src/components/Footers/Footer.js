import React from 'react';

// reactstrap components
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <>
      <Container fluid>
        <footer style={footer} className='pt-0'>
          <Row className='align-items-center justify-content-lg-between'>
            <Col lg='6'>
              <div className='copyright text-center text-lg-left text-muted'>
                © {new Date().getFullYear()}{' '}
                <a
                  className='font-weight-bold ml-1'
                  href='https://github.com/ali-ajam'
                  target='_blank'
                >
                  Ali Ajam
                </a>
              </div>
            </Col>
          </Row>
        </footer>
      </Container>
    </>
  );
};

const footer = {
  background: 'white',
  padding: '30px 0',
};

export default Footer;

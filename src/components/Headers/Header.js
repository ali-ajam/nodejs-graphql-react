import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { gql, useQuery } from '@apollo/client';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

const getAnalyticts = gql`
  {
    analytics {
      totalVehicles
      newVehicles
      newVehicles
      avgCharge
    }
  }
`;

const Header = () => {
  const [analytics, setAnalytics] = useState({
    avgCharge: 0,
    newVehicles: 0,
    outOfNetwork: 0,
    totalVehicles: 0,
  });
  const { error, loading, data } = useQuery(getAnalyticts);
  useEffect(() => {
    axios
      .get(`Your-Server`)
      .then((res) => {
        console.log(res);
        setAnalytics(res.data['USA']);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(analytics, error, loading, data);
  }, []);

  return (
    <Fragment>
      <div style={header}>
        <Container fluid>
          <div style={headerBody}>
            <Row>
              <Col md='6' xl='3'>
                <Card style={card}>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h6'
                          className='text-uppercase text-muted mb-0'
                        >
                          Total electric vehicles
                        </CardTitle>
                        <span className='h3 font-weight-bold mb-0'>
                          {analytics.totalVehicles}
                        </span>
                      </div>
                    </Row>
                    <p className='mt-3 mb-0 text-sm'>
                      <span className='text-success mr-2'>1.48%</span>
                      <span className='text-nowrap'>Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md='6' xl='3'>
                <Card style={card}>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h6'
                          className='text-uppercase text-muted mb-0'
                        >
                          New electric vehicles
                        </CardTitle>
                        <span className='h3 font-weight-bold mb-0'>
                          {analytics.newVehicles}
                        </span>
                      </div>
                    </Row>
                    <p className='mt-3 mb-0 text-sm'>
                      <span className='text-success mr-2'>3.48%</span>
                      <span className='text-nowrap'>Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md='6' xl='3'>
                <Card style={card}>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h6'
                          className='text-uppercase text-muted mb-0'
                        >
                          Average charge level
                        </CardTitle>
                        <span className='h3 font-weight-bold mb-0'>
                          {analytics.avgCharge}
                        </span>
                      </div>
                    </Row>
                    <p className='mt-3 mb-0 text-sm'>
                      <span className='text-warning mr-2'>5%</span>
                      <span className='text-nowrap'>below the limit</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md='6' xl='3'>
                <Card style={card}>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h6'
                          className='text-uppercase text-muted mb-0'
                        >
                          Out of Network
                        </CardTitle>
                        <span className='h3 font-weight-bold mb-0'>
                          {analytics.outOfNetwork}
                        </span>
                      </div>
                    </Row>
                    <p className='mt-3 mb-0 text-sm'>
                      <span className='text-danger mr-2'>7%</span>
                      <span className='text-nowrap'>Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

const header = {
  backgroundColor: '#11cdef',
  paddingBottom: '4.5rem',
  paddingTop: '4.5rem',
  position: 'relative',
};

const headerBody = {
  fontFamily: 'Open Sans, sans-serif',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  color: 'rgb(82, 95, 127)',
  textAlign: 'left',
};

const card = {
  marginBottom: '30px',
  boxShadow: '0 0 2rem 0 rgba(136, 152, 170, 0.15)',
  border: '0',
  fontFamily: 'Open Sans, sans-serif',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  color: 'rgb(82, 95, 127)',
  textAlign: 'left',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '0',
  backgroundColor: '#fff',
  backgroundClip: 'borderBox',
  borderRadius: '0.5rem',
};

export default Header;

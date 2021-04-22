import React, { Fragment, useEffect, useState } from 'react';
import { compose } from 'recompose';
// react plugin used to create google maps
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
// reactstrap components
import { Card, Container, Row } from 'reactstrap';
import axios from 'axios';
// core components
import Header from 'components/Headers/Header.js';
import car from '../assets/img/car.png';

import { gql, useQuery } from '@apollo/client';

const getCars = gql`
  {
    cars {
      brand
      color
    }
  }
`;

const MapCustom = compose(
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
    defaultOptions={{
      scrollwheel: false,
    }}
    options={{ gestureHandling: 'greedy', zoomControl: false }}
  >
    {props.cars.map((value, index) => {
      return (
        <MarkerWithLabel
          key={index}
          position={{
            lat: value.location._latitude,
            lng: value.location._longitude,
          }}
          labelStyle={markerStyle}
          labelAnchor={new window.google.maps.Point(0, 0)}
        >
          <Fragment>
            <div
              style={{
                ...labelStyle,
                background: 'linear-gradient(87deg, #2dce89 0, #2dcecc 100%)',
              }}
            >
              {value.name}
            </div>
            <img
              style={{ width: '50px', transform: 'rotate(210deg)' }}
              src={car}
            />
          </Fragment>
        </MarkerWithLabel>
      );
    })}
  </GoogleMap>
));

const Google = () => {
  const [cars, setCars] = useState([]);
  const { error, loading, data } = useQuery(getCars);
  useEffect(() => {
    let REST = {};
    axios
      .get(`Your-Server`)
      .then((cars) => {
        REST = cars.data;
        axios
          .get(`Your-Server`)
          .then((res) => {
            for (let value of Object.values(res.data)) {
              REST[value.car]['name'] = value.name;
            }
            setCars(Object.values(REST));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(cars, error, loading, data);
  }, data);

  return (
    <Fragment>
      <Header />
      <Container style={{ marginTop: '-4.5rem' }} fluid>
        <Row>
          <div className='col'>
            <Card className='border-0'>
              <MapCustom
                cars={cars}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                  <div
                    style={{ height: `600px`, borderRadius: '0.5rem' }}
                    className='map-canvas'
                    id='map-custom'
                  />
                }
                mapElement={
                  <div style={{ height: `100%`, borderRadius: 'inherit' }} />
                }
              />
            </Card>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};

const labelStyle = {
  margin: '5px',
  padding: '5px',
  borderRadius: '50%',
};

const markerStyle = {
  color: '#fff',
  boxShadow: '0 0 2rem 0 rgba(136, 152, 170, 0.15)',
  borderRadius: '50%',
  fontSize: '16px',
  padding: '10px',
};

export default Google;

import React from 'react';
// core components
import Footer from 'components/Footers/Footer.js';

import Google from 'pages/Google';

const Admin = () => {
  return (
    <div style={style}>
      <Google />
      <Footer />
    </div>
  );
};

const style = {
  fontFamily: 'Open Sans, sans-serif',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  color: '#525f7f',
  textAlign: 'left',
  position: 'relative',
};

export default Admin;

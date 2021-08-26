import * as React from 'react';

import { Link } from 'react-router-dom';

const Home: React.FunctionComponent = (props) => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/app/test">
            Test
          </Link>
    </div>
  ); 
};

export default Home;
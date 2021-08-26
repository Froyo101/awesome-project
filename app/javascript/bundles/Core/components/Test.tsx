import * as React from 'react';

//import { useHistory } from 'react-router-dom';

const Test: React.FunctionComponent = (props) => {
  //const history = useHistory();
  //const handleOnClick = React.useCallback(() => history.push('/app'), [history]);
  //const handleOnClick = () => history.push('/app')
  
  return (
    <div>
      <h1>Test</h1>
      <a href="/app">Home</a>
    </div>
  ); 
};

export default Test;
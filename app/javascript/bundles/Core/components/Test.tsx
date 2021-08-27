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

export class TestClass extends React.Component<{}, { testState: string }> {
  constructor(props) {
    super(props);

    this.state = {
      testState: "Hello world!",
    };
  }

  render() {
    return (
      <div>
        <h1>Test Class</h1>
        <p>{this.state.testState}</p>
        <a href="/app">Home</a>
      </div>
    );
  }
}
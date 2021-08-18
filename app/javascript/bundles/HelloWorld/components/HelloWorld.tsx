import * as React from 'react';
import { useState, FunctionComponent } from 'react';

const styles = {
  fontFamily: "Roboto, sans-serif",
};

export interface Props {
  name: string;
}

// Type must be declared for ReactOnRails.register to work properly
const HelloWorld: FunctionComponent<Props> = (props: Props) => {
  const [name, setName] = useState(props.name);

  return (
    <div style={styles}>
      <h3>Hello, {name}!</h3>
      <hr />
      <form>
        <label htmlFor="name">
          Say hello to:
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </form>
    </div>
  );
};

export default HelloWorld;
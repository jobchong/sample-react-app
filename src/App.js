import React from 'react';
import logo from './logo.svg';
import aclasswhite from './carImages/aclasswhite.jpg'
import aclasssilver from './carImages/aclasssilver.jpg'
import aclassred from './carImages/aclassred.jpg'
import { Field } from './features/fields/Field';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
	<Field
	  aclasswhite={aclasswhite}
          aclasssilver={aclasssilver}
          aclassred={aclassred}
	/>
      </header>
    </div>
  );
}

export default App;

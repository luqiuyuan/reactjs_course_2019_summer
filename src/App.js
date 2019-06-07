import React from 'react';
import Button, { Title, Footer } from './components/Button';
import './App.css';

function App() {
  const showAlert = () => {
    alert("Hello ReactJS!");
  }

  return (
    <div className="App">
      <div className="Panel">
        <Button buttonFunction={showAlert} label="Sign Up" />
      </div>
    </div>
  );
}

export default App;

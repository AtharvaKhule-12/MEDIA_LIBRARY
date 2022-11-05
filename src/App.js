import React, { useState } from 'react';
import './App.css';
import Modal from './components/Modal/Modal';
import { Contextstate } from './config';

const App = () => {
  const [click, setClick] = useState(false);

  const onClick = (event) => {
    event.preventDefault();
    setClick(true);
  }

  const { data, setData } = Contextstate();

  const addData = (title,desc) => {
    setData([...data, {
      title: title,
      desc: desc
    }])
    console.log(title,desc);
  }

  const Reset = () => setClick(false);
  return (
    <div className='container mt-4'>
      {click && <Modal onConfirm={Reset} addData={addData}/>}
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown button
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#" >Action</a></li>
          <li><a className="dropdown-item" href="#">Another action</a></li>
          <li><a className="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
      
      <button onClick={onClick}>Click</button>

    </div>)
};

export default App;

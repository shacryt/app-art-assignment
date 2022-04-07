import React from 'react';
import Variables from '../styles/Variables.module.scss';

const BlueBlock = ({ number }) => {
  return (
    <div
      className='fl-row fl-full-center'
      style={{
        width: '200px',
        maxWidth: '80%',
        height: '60px',
        backgroundColor: Variables.blue1,
        color: 'white',
        marginBottom: '15px',
      }}
    >
      {number}
    </div>
  );
};

export default BlueBlock;

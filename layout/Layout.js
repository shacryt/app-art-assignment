import React from 'react';
import Meta from '../components/Meta';
import Variables from '../styles/Variables.module.scss';

const Layout = ({ metaData, Component, style }) => {
  return (
    <div
      className='layout-wrapper fl-column'
      style={{
        backgroundColor: Variables.primaryColor,
        color: Variables.primaryTextColor,
        ...style,
      }}
    >
      <Meta {...metaData} />
      {Component}
    </div>
  );
};

export default Layout;

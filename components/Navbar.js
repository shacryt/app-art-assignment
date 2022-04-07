import React, { useEffect, useState } from 'react';
import styles from '../styles/components/Navbar.module.scss';
import sideMenuStyles from '../styles/components/SideMenu.module.scss';
import homePageStyles from '../styles/HomePage.module.scss';

import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { Icon } from 'react-icons-kit';

import $ from 'jquery';
import SideMenu from './SideMenu';

const Navbar = () => {
  //This is just used to center icons imported via the react-icons-kit because they tend to have a centering issue.
  const centerStyle = {
    display: 'flex',
    flexShrink: '0',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const toggleSideMenu = () => {
    if ($('#side-menu').hasClass(sideMenuStyles.hideMenu)) {
      $('#side-menu').removeClass(sideMenuStyles.hideMenu);
      $('#main-body').addClass(homePageStyles.sideMenuOpen);
    } else {
      $('#side-menu').addClass(sideMenuStyles.hideMenu);
      $('#main-body').removeClass(homePageStyles.sideMenuOpen);
    }
  };

  return (
    <div
      id='navbar-wrapper'
      className={'fl-column fl-justify-center ' + styles.navbarWrapper}
    >
      <SideMenu />
      <button
        className={'fl-row fl-full-center'}
        style={{
          color: 'black',
          marginRight: 'auto',
          background: 'white',
          borderRadius: '100%',
          height: '40px',
          width: '40px',
        }}
        onClick={() => {
          toggleSideMenu();
        }}
      >
        <Icon icon={ic_menu} size='25px' style={centerStyle} />
      </button>
    </div>
  );
};

export default Navbar;

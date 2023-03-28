import React from 'react';
import { NavLink } from 'react-router-dom';

import "../scss/header.scss"

function Header({menus}) {
  return (
    <nav className='header_container'>
        <header>
          <div className='inner_container'>
            <div className='menu_left'>
              <ul>
                {menus[0].map(menu => <li key={menu.text}><div className='inner_block'><NavLink to={menu.link} >{menu.text}</NavLink></div></li>)}
              </ul>
            </div>
            <div className='menu_right'>
              <ul>
                {menus[1].map(menu => <li  key={menu.text}><div className='inner_block'><NavLink to={menu.link} >{menu.text}</NavLink></div></li>)}
              </ul>
            </div>
          </div>
        </header>
    </nav>
  )
}

export default Header
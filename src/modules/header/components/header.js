import React from 'react'
import { Link } from 'react-router'
import './header.css'

const Main = ({ children }) => {
  return (
    <div className='app'>
      <aside>
        <ul>
          <li><Link to='/'>Board</Link></li>
          <li><Link to='/profile'>Profile</Link></li>
        </ul>
      </aside>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Main

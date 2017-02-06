import React from 'react'
import { Link } from 'react-router'
import './main.css'

const Main = ({ children }) => {
  return (
    <div className='app'>
      <aside>
        <ul>
          <li><Link to='/'>Board</Link></li>
          <li><Link to='/reduxFormExample'>Redux form example</Link></li>
        </ul>
      </aside>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Main

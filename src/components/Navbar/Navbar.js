import React from 'react'
import {Link} from 'react-router-dom'
import './NavbarStyles.css'

export const Navbar = () => {
  return (
    <div>
        <nav>
            <div className="navegador">
                <Link to='/' className="navitem">1erForm</Link>
                <Link to='segundo-form' className="navitem">2doForm</Link>
            </div>
        </nav>
    </div>
  )
}


export default Navbar;
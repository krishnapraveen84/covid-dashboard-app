import './index.css'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {Link} from 'react-router-dom'
import {IoIosMenu} from 'react-icons/io'
import {IoCloseCircle} from 'react-icons/io5'

export default function Header() {
  return (
    <nav className="nav-bar">
      <h1 className="logo-name">
        COVID19<span className="india-name">INDIA</span>
      </h1>
      <div className="nav-items-sm">
        <Popup
          modal
          trigger={
            <button className="menu-btn">
              <IoIosMenu />
            </button>
          }
          className="popup-content"
        >
          {close => (
            <div className="routes-card">
              <div className="links-card">
                <Link to="/" className="route-name">
                  Home
                </Link>
                <Link to="/about" className="route-name">
                  About
                </Link>
              </div>
              <button onClick={close} className="close-btn">
                <IoCloseCircle className="close-icon" />
              </button>
            </div>
          )}
        </Popup>
      </div>
      <div className="nav-items-lg">
        <Link to="/" className="route-name">
          Home
        </Link>
        <Link to="/about" className="route-name">
          About
        </Link>
      </div>
    </nav>
  )
}

import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>

        <nav className='d-flex justify-content-center'>
          <NavLink to='/'
            className={(navData) => navData.isActive ? 'nav-link active' : 'nav-link'}
          >Home</NavLink>
          <NavLink to='about'
            className={(navData) => navData.isActive ? 'nav-link active' : 'nav-link'}
          >About</NavLink>
          <NavLink to='products'
            className={(navData) => navData.isActive ? 'nav-link active' : 'nav-link'}
          >Charities</NavLink>
          <NavLink to='posts'
            className={(navData) => navData.isActive ? 'nav-link active' : 'nav-link'}
          >Blog Posts</NavLink>
        </nav>
        <div className="copyrights">
          &copy; 2024 <Link to="/"> RMIT Student | Group </Link> - All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
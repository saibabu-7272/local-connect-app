import './index.css'
import {Link} from 'react-router-dom'

const Header = () => (<nav className='header'>
    <Link className='link-style' to="/"><h1 className='website-name'>LOCAL CONNECT</h1></Link>
    
    <div className='tabs-container'>
        <Link className='link-style' to="/" ><p className='tab'>Home</p></Link>
        <Link className='link-style' to="/profile" ><p className='tab'>Profile</p></Link>
    </div>
</nav>)

export default Header
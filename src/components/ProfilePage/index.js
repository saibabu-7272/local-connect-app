import { Component } from 'react'
import './index.css'
import Header from '../Header'
import Cookies from 'js-cookie'
import withRouter from '../withRouter'

class ProfilePage extends Component{
    state = {userDetails : {},isLoading : false}
    componentDidMount(){
        this.fetchUserDetails()
    }
    fetchUserDetails = async () => {
        try{
                this.setState({isLoading : true})
                const jwtToken = Cookies.get("jwt_token")
                const userId = Cookies.get("user_id")
               
                const options = {
                    method : 'GET',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        Authorization : `Bearer ${jwtToken}`
                    }
                }
                const response = await fetch(`https://localconnect-stx1.onrender.com/getUserData/${userId}`,options)
                const userData = await response.json()
                if(response.ok){
                    this.setState({userDetails : userData,isLoading : false})
                }
        }catch(e){
            console.log(e.message)
        }

    }
    onLogout = () => {
        Cookies.remove("jwt_token")
        Cookies.remove("user_id")
        this.props.navigate('/login')
    }
    render(){
        const {userDetails,isLoading} = this.state
        const {name, age, service, state, district, city,email} = userDetails
        return(
            <>
            <Header />
            <div className='profile-page'>
                {
                    isLoading ? 
                    <div className='loader'></div>
                    :
                    <div className='user-profile-card'>
                    <div className='profile-pic'>
                        <div className='head'></div>
                        <div className='body'></div>
                    </div>
                    <ul className='user-details-box'>
                        <li className='record'>
                            <p className='text-right'>Name:</p>
                            <p>{name}</p>
                        </li>
                        <li className='record'>
                            <p className='text-right'>Age:</p>
                            <p>{age}</p>
                        </li>
                        <li className='record'>
                            <p className='text-right'>Service:</p>
                            <p>{service}</p>
                        </li>
                        <li className='record'>
                            <p className='text-right'>State:</p>
                            <p>{state}</p>
                        </li>
                        <li className='record'>
                            <p className='text-right'>District:</p>
                            <p>{district}</p>
                        </li>
                        <li className='record'>
                            <p className='text-right'>City:</p>
                            <p>{city}</p>
                        </li>
                        <li className='record'>
                            <p className='text-right'>Gmail:</p>
                            <p>{email}</p>
                        </li>
                        <li className='logout-btn-box'>
                        <button onClick={this.onLogout} className='logout-btn'>Logout</button>

                        </li>
                    </ul>

                </div> 

                }

                
            
            </div>

            </>

        )
    }
}

export default withRouter(ProfilePage)
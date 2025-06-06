import { Component } from 'react'
import './index.css'
import Cookies from 'js-cookie'
import LocalConnectContext from "../../context/LocalConnectContext";
import withRouter from '../withRouter';
import Header from '../Header';
import { IoPersonCircle } from "react-icons/io5";
import { MdMiscellaneousServices,MdOutlineEmail  } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

class ServiceProvidersPage extends Component{
    state = {isLoading : false, serviceProviders : [], userLocation : '' , wantedService : ''}
    
    componentDidMount(){
        this.fetchData()
    }

    fetchData = async ()=>{
        try{
            
            this.setState({isLoading : true})
            const userID = Cookies.get("user_id")
            const jwtToken = Cookies.get("jwt_token")
           
            const fetchUserDataUrl = `https://localconnect-stx1.onrender.com/getUserData/${userID}`
            const fetchUserOptions = {
                method : 'GET',
                headers : {
                    'Accept' : 'application/json',
                    Authorization : `Bearer ${jwtToken}`
                }
            }
            const fetchUserResponse = await fetch(fetchUserDataUrl, fetchUserOptions)
            const fetchUserData = await fetchUserResponse.json()
            
            if(fetchUserResponse.ok){
               
                const city = fetchUserData.city 
                const service = this.getService(this.props.params.serviceId)
                this.setState({userLocation : city, wantedService : service})
                const cityAndServiceObject = {
                    city,
                    service
                }
                const optionsToFetchAll = {
                    method : 'POST',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        Authorization : `Bearer ${jwtToken}`
                    },
                    body : JSON.stringify(cityAndServiceObject)
                }
                const fetchAllProviderRes = await fetch("https://localconnect-stx1.onrender.com/getUsers/",optionsToFetchAll)
                const fetchAllProviderData = await fetchAllProviderRes.json()
                if(fetchAllProviderRes.ok){
                    this.setState({isLoading : false})
                    this.setState({serviceProviders : fetchAllProviderData})
                }
            }

        }catch(e){
            console.log(e.message)
        }
    }
    render(){
        const {isLoading, serviceProviders, userLocation, wantedService} = this.state
        return(
            <LocalConnectContext.Consumer>
            {value => {
                const {services} = value
                 this.getService = (serviceId) =>{
                    const selectedService = services.find(eachService => eachService.service_id === parseInt(serviceId))
                    return selectedService.service_name
                }
                return(
                    <>
                    <Header />
                    <div className='service-providers-page'>
                        {isLoading ? <div className='loader'></div> : 
                        <>
                        {serviceProviders.length === 0 ? <div className='not-found-container'>
                            <h1>Not Found!</h1>
                            <p className='not-found-msg'>Looking like there are no service providers for {wantedService} in {userLocation}!</p>
                        </div> : 
                        <ul className='service-provider-container'>
                            {serviceProviders.map(each => <li className='service-provider-card' key={each.service_id}>
                                <div className='flex-box'><IoPersonCircle className='provider-card-icons person-icon' /> <h1 className='no-margin'>{each.name}</h1></div>
                                <hr/>
                                <div className='flex-box'><MdMiscellaneousServices className='provider-card-icons' /> <p className='no-margin'>{each.service}</p></div>
                                <div className='flex-box'><MdOutlineEmail className='provider-card-icons' /><p className='no-margin'>{each.email}</p></div>
                                <div className='flex-box'><FaLocationDot className='provider-card-icons' /><p className='no-margin'>{each.city}</p></div>
                                </li>)}
                        </ul> 
                        }
                        </>
                        }
                        
                    </div>
                    </>
                )
            }}    
            </LocalConnectContext.Consumer>
            
             )
            }
}

export default withRouter(ServiceProvidersPage) 
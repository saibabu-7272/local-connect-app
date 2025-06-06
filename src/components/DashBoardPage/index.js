import { Component } from "react";
import { Link } from "react-router-dom";
import './index.css'
import Header from "../Header";
import Cookies from 'js-cookie'
import LocalConnectContext from "../../context/LocalConnectContext";

class DashBoardPage extends Component {
    render(){
        const token = Cookies.get("jwt_token")
        console.log(token)
        return(
            <LocalConnectContext.Consumer>
                {
                    value =>{
                        const {services} = value
                        return(
                        <div className="dashboard-page">
                            <Header />
                            <div >
                                <h1 className="dashboard-heading">All Services</h1>
                            </div>
                            <ul className="services-container">
                                {services.map(eachService => <Link className="link-style" to={`/service/${eachService.service_id}`}><li key={eachService.service_id} className="service-card"><p className="service-name">{eachService.service_name}</p></li></Link> )}
                            </ul>
                        </div>)
                    }
                }
            </LocalConnectContext.Consumer>
            
        )
    }
}

export default DashBoardPage
import { Component } from "react";
import './index.css'
import Cookies from 'js-cookie'
import withRouter from "../withRouter";
import LocalConnectContext from "../../context/LocalConnectContext";



class LoginPage extends Component {
    state = {isLoading : false ,showLoginCard : true ,stateId : "none", districtId : 'none', name : "" , gmail : "" , age : "" , service : "none" , city : "none", password : "", message : '',
        loginError : '', createAccountError : ''
    }

    onSelectState = event => this.setState({stateId : parseInt(event.target.value)})

    onSelectDistrict = event => this.setState({districtId : parseInt(event.target.value)})

    onUpdateName = event => this.setState({name : event.target.value})

    onUpdateGmail = event => this.setState({gmail : event.target.value.toLowerCase()})

    onUpdateAge = event => this.setState({age : parseInt(event.target.value)})

    onUpdateService = event => this.setState({service : event.target.value})

    onUpdateCity = event => this.setState({city : event.target.value})

    onUpdatePassword = event => this.setState({password : event.target.value})

    toggleLoginCards = () => this.setState(prevState => ({showLoginCard : !prevState.showLoginCard}))

    render(){
        const {createAccountError, message, showLoginCard} = this.state
        return(
            <LocalConnectContext.Consumer>
                {
                    value => {
                        const {services,states,districts,cities} = value

                        const getDistrict = () =>{
                            const {stateId} = this.state 
                            let listOfDistricts = []
                            if(stateId !== ""){
                                listOfDistricts = districts.filter(eachDistrict => eachDistrict.state_id === stateId)
                            }
                            return listOfDistricts
                        }
                        const getCities = () =>{
                            const {districtId} = this.state 
                            let listOfCities = []
                            if(districtId !== ""){
                                listOfCities = cities.filter(eachCity => eachCity.district_id === districtId)
                            }
                            return listOfCities
                        }
                        const onCreateAccount = async (event) =>{
                            event.preventDefault()
                            try{
                                const {stateId,districtId,name, gmail, age, service, city, password} = this.state
                                if(stateId === 'none' || districtId === 'none' || city === 'none' || service === 'none' || name === '' || gmail === '' || age === '' || password === ''){
                                    return this.setState({createAccountError : 'Fill the required fields!'})
                                }
                                this.setState({isLoading : true})
                                const stateName = states.find(eachState => eachState.state_id === stateId)
                                const districtName = districts.find(eachDistrict => eachDistrict.district_id === districtId)
                                const newUserDetails = {
                                    name: name,
                                    email: gmail,
                                    password : password,
                                    age: age,
                                    service: service,
                                    state: stateName.state_name,
                                    district: districtName.district_name,
                                    city: city
                                    }
                                const url = 'https://localconnect-stx1.onrender.com/register'
                                const options = {
                                    method : 'POST',
                                    headers : {
                                        'Content-Type' : 'application/json',
                                        'Accept' : 'application/json'
                                    },
                                    body : JSON.stringify(newUserDetails)
                                    }

                                const response = await fetch(url , options);
                                const data = await response.json()
                                this.setState({isLoading : false})
                                if (response.ok){
                                    this.setState({message : data.message, showLoginCard : true, createAccountError : ''})  
                                }else{
                                    this.setState({createAccountError : data.errorMsg})
                                }

                            }catch(e){
                                console.log(e.message)
                            }
                            
                        }

                        const onLogin = async (event) => {
                            event.preventDefault()
                            try{
                                
                                const {gmail, password} = this.state
                                if(gmail === '' || password === ''){
                                    return this.setState({loginError : 'Fill the required fields!'})
                                }
                                this.setState({isLoading : true})
                                const loginDetails ={
                                        email : gmail,
                                        password
                                    }
                                    const loginApi = 'https://localconnect-stx1.onrender.com/login'
                                    const loginOptions = {
                                        method : 'POST',
                                        headers : {
                                            'Content-Type' : 'application/json',
                                            'Accept' : 'application/json'
                                        },
                                        body : JSON.stringify(loginDetails)
                                    }
                                    const loginResponse = await fetch(loginApi, loginOptions)
                                    const loginData = await loginResponse.json()
                                    console.log(loginData)
                                    this.setState({isLoading : false})
                                    if(loginResponse.ok){
                                        Cookies.set("jwt_token",loginData.jwtToken, {expires : 10})
                                        Cookies.set("user_id",loginData.userId, {expires : 10})
                                        this.setState({loginError : ""})
                                        this.props.navigate("/")
                                    }else{
                                        this.setState({loginError : loginData.errorMsg})
                                    }
                                
                            }catch(e){
                                console.log(e.message)
                            }
                        }

                        const renderAllViews = () =>{
                            const {isLoading, loginError} = this.state
                            if (isLoading){
                                return <div className="login-page">
                                    <div className="loader"></div>
                                </div>
                            }else{
                                return <div className="login-page">
                                {showLoginCard ? 
                                    <div className="login-card">
                                        {message !== '' && <p className="success-msg">{message} try login</p>}
                                        <h1><span className='website-name'>LOCAL CONNECT</span> Login</h1>
                                        <form onSubmit={onLogin} >
                                            <div className="input-container">
                                                <label htmlFor="gmail">GMAIL<span className="required-icon">*</span></label>
                                                <input placeholder="Enter gmail address" onChange={this.onUpdateGmail} id="gmail" className="input-box width-100" type="text" />
                                            </div>
                                            <div className="input-container">
                                                <label htmlFor="password">PASSWORD<span className="required-icon">*</span></label>
                                                <input placeholder="Enter password" onChange={this.onUpdatePassword} id="password" className="input-box width-100" type="password" />
                                            </div>
                                            <button className="submit-btn" type="submit" >Login</button>
                                            {loginError !== "" && <p className="error-msg">{loginError}</p>}
                                            <p >Don't have account? <span className="link" onClick={this.toggleLoginCards}>Create Here</span> </p>
                                        </form>
                                    </div>
                                :
                                    <div className="login-card">
                                    <h1><span className='website-name'>LOCAL CONNECT</span> Create Account</h1>
                                    <form onSubmit={onCreateAccount} className="form-container">
                                        <section>
                                            <div className="input-container">
                                            <label htmlFor="name">NAME<span className="required-icon">*</span></label>
                                            <input placeholder="Enter name" onChange={this.onUpdateName} id="name" className="input-box" type="text" />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="gmail">GMAIL<span className="required-icon">*</span></label>
                                            <input placeholder="Enter gmail address" onChange={this.onUpdateGmail} id="gmail" className="input-box" type="text" />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="age">AGE<span className="required-icon">*</span></label>
                                            <input placeholder="Enter age" onChange={this.onUpdateAge} id="age" className="input-box" type="text" />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="service">SERVICE<span className="required-icon">*</span></label>
                                            <select onChange={this.onUpdateService}  id="service" className="input-box">
                                                <option value="none" >Select</option>
                                                {services.map(eachService => <option value={eachService.service_name} id={eachService.service_id} key={eachService.service_id}>{eachService.service_name}</option>)}
                                            </select>
                                        </div>
                                        </section>
                                        <section>
                                            <div className="input-container">
                                            <label htmlFor="state">STATE<span className="required-icon">*</span></label>
                                            <select onChange={this.onSelectState} id="state" className="input-box">
                                                <option value="none" >Select</option>
                                                {states.map(eachState => <option value={eachState.state_id} id={eachState.state_id} key={eachState.state_id}>{eachState.state_name}</option>)}
                                            </select>
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="district">DISTRICT<span className="required-icon">*</span></label>
                                            <select onChange={this.onSelectDistrict} id="district" className="input-box">
                                                {filteredDistricts.length === 0 ? <option>Select State to see The Districts</option>
                                                 :
                                                 <>
                                                 <option value="none" >Select</option>
                                                 {filteredDistricts.map(eachDistrict => <option value={eachDistrict.district_id}  key={eachDistrict.district_id}>{eachDistrict.district_name}</option>)}
                                                 </>
                                                 }
                                                
                                            </select>
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="city">CITY<span className="required-icon">*</span></label>
                                            <select onChange={this.onUpdateCity} id="city" className="input-box">
                                                {filteredCities.length === 0 ? <option>Select District to see The Cities</option>
                                                 :
                                                 <>
                                                 <option value="none" >Select</option>
                                                 {filteredCities.map(eachCity => <option value={eachCity.city_name}  key={eachCity.city_id}>{eachCity.city_name}</option>)}
                                                 </>
                                                 }
                                            </select>
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="password">PASSWORD<span className="required-icon">*</span></label>
                                            <input placeholder="Create password" onChange={this.onUpdatePassword} id="password" className="input-box" type="password" />
                                        </div>
                                        <button className="submit-btn" type="submit" >Create New Account</button>
                                        {createAccountError !== '' && <p className="error-msg">{createAccountError}</p>}
                                        
                                        <p>Already have a Account? <span className="link" onClick={this.toggleLoginCards}>login</span></p>
                                        </section>
                                    </form>
                                </div>
                                }
                                
                                
                            </div>
                            }
                        }

                        const filteredDistricts = getDistrict()
                        const filteredCities = getCities()
                        return (
                            <>
                            {renderAllViews()}
                            </>
                        )
                    }
                }
                
            </LocalConnectContext.Consumer>
            
        )
    }
}

export default withRouter(LoginPage)
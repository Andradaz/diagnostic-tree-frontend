import React from "react"
//import {useContext} from "react"
import {Route, Redirect} from "react-router-dom"
//import {AuthContext} from "./Auth"
import { withRouter } from "react-router"

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    //const [currentUser, setCurrentUser] = useContext(AuthContext);
    
    return(
        <Route
        {...rest}
        render = { (routeProps) => {
            if(sessionStorage.getItem('currentUser') === null){
                return <Redirect to={"/signin"} />
            }else if(sessionStorage.getItem('admin') === "true"){
                return <RouteComponent {...routeProps}/> 
            }else{
                return <Redirect to= {"/diagnostic"} />
            }
        }}
        />
    )
}

export default withRouter(PrivateRoute)
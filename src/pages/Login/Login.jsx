import React,{ useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import FormInput from '../../components/FormInput'
import {login} from '../../redux/apiCalls'

const Login = () => {

   const [value, setValue] = useState({
      username:"",
      password:"",
   })


   const dispatch = useDispatch()

   const history = useHistory()

   const {currentUser} = useSelector(state => state.user)

   const {error} = useSelector(state => state.user)
   
   const inputs = [
      {
         name: "username",
         type:"text",
         placeholder:"Username",
         label:"Username",
         errorMessage:"Username should be 3-16 characters and shouldn't include any speacial character!",
         required:true,
         pattern:"^[A-Za-z0-9]{3,16}$"
      },
      {
         name: "password",
         type:"password",
         placeholder:"Password",
         label:"Password",
         errorMessage:"Password should be 3-16 characters and shouldn't include any speacial character!",
         required: true,
         pattern:`^[A-Za-z0-9]{3,16}$`
      },
   ]

   const handleSubmit = (e) => {
      e.preventDefault()
      login(dispatch,value)
   }

   const handleChange = (e) => {
      setValue({...value, [e.target.name]: e.target.value})
   }

   useEffect(() => {
      currentUser && history.push('/') 
   },[currentUser, history])

   return (
      <div className="login">
         <div className="login__container">
            <h1 className="login__title">login</h1>
            <form onSubmit={handleSubmit}>
               {
                  inputs.map((item, index) => (
                     <FormInput 
                        key={index}
                        {...item}
                        onChange={handleChange}
                        value={value[item.name]}
                     />
                  ))
               }
               <button className="login__btn" >submit</button>
               {error && <span style={{color:'red'}}>Username or password wrong</span>}
               <Link to="/register">
                  <button className="login__return">
                     register
                  </button>
               </Link>
            </form>
         </div>
      </div>
   )
}

export default Login

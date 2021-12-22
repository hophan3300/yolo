import React,{ useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector ,useDispatch} from 'react-redux'

import {register} from '../../redux/apiCalls'
import FormInput from '../../components/FormInput'

const Register = () => {

   const dispatch = useDispatch()

   const {error} = useSelector(state => state.user)

   const {currentUser} = useSelector(state => state.user)

   const history = useHistory()

   useEffect(() => {
      currentUser && history.push('/') 
   },[currentUser, history])

   const [value, setValue] = useState({
      username:"",
      email:"",
      birthDay:"",
      password:"",
      confirmPassword:""
   })
   
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
         name: "email",
         type:"email",
         placeholder:"Email",
         label:"Email",
         errorMessage:"It should be valid email address!",
         required: true,
      },
      {
         name: "birthday",
         type:"date",
         label:"Birthday",
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
      {
         name: "confirmPassword",
         type:"password",
         placeholder:"Confirm Password",
         label:"Confirm Password",
         errorMessage:"Password don't match",
         required: true,
         pattern: value.password
      }, 
   ]

   const handleSubmit = (e) => {
      e.preventDefault()
      register(dispatch, value)
   }

   const handleChange = (e) => {
      setValue({...value, [e.target.name] : e.target.value})
   }

   return (
      <>
        <div className="register">
         <div className="register__container">
         <h1 className="register__title">register</h1>
            <form onSubmit={handleSubmit}>
               {
                  inputs.map((item, index) => (
                     <FormInput 
                        key={index}
                        {...item}
                        value={value[item.name]}
                        onChange={handleChange}
                     />
                  ))
               }
               <button className="register__btn">submit</button>
               {error &&<span style={{color:'red'}}>Username or email be used</span>}
               <Link to="/login">
                  <button className="register__return">
                     login
                  </button>
               </Link>
            </form>
         </div>
         </div>
      </>
   )
}

export default Register

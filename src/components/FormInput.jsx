import React,{ useState} from 'react'

const FormInput = (props) => {

   const {label, errorMessage, ...other} = props
  
   const [focused, setFocused] = useState(false)

   const handleBlur = () => {
      setFocused(true)
   }

   return (
      <div className="form__input">
         <label>{label}</label>
         <input 
            {...other}
            focused={focused.toString()} 
            onBlur={handleBlur} 
            onFocus={() => other.name === "confirmPassword" && setFocused(true)}
         />
         <span>{errorMessage}</span>
      </div>
   )
}

export default FormInput

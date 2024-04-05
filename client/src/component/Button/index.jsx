import React from 'react'

const btnColors = (type)=>{
  switch(type){
    case 'info':
    return 'bg-info-1 hover:bg-info-2'
  }
}

const Button = (
    {label,
     type="info",
     icon,
     onClick
    }

) => {
  return (
  <button
  onClick={onClick}
  type="submit"
  className={`inline-block 
  rounded 
  bg-info
  px-6 
  pb-2 
  pt-2.5 
  text-xs 
  font-medium 
  uppercase 
  leading-normal
text-white
  items-center
 ${btnColors(type)}`}>
  {icon && <span className='inline-block pr-1'>{icon}</span>} {label}
</button>
  )
}

export default Button
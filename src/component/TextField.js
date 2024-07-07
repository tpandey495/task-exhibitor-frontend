import { TextField } from '@mui/material'
import React from 'react'

const CustomTextField = ({ name="", label="",varient='outlined', customStyle,handleChange,...props }) => {
  return (
    <>
      <TextField
        name={name}
        label={label}
        variant={varient}
        sx={customStyle}
        onChange={handleChange}
        {...props}
      />
    </>
  )
}

export default CustomTextField
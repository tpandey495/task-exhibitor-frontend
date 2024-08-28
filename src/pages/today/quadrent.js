import React from 'react'
import './styles/quadrent.css'
import { Box } from '@mui/material'

const Quadrent = () => {
  return (
    <Box sx={{padding: '1rem 2rem', position: 'relative'}}>
        <Box className="centerbox">
        </Box>
        <Box className="quadrentsparentbox">
            <Box className="quadrentbox quadrentbox1"><Box className="head head1">SAYS</Box></Box>
            <Box className="quadrentbox quadrentbox2"><Box className="head head2">THINKS</Box></Box>
            <Box className="quadrentbox quadrentbox3"><Box className="head head3">DOES</Box></Box>
            <Box className="quadrentbox quadrentbox4"><Box className="head head4">FEELS</Box></Box>
        </Box>
    </Box>
  )
}

export default Quadrent
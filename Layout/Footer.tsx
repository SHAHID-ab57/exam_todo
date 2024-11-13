import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box
    sx={{
        py:2,
        backgroundColor: '#3f51b5',
        color: 'primary.contrastText',
        width: '100%',
        textAlign: 'center',
        '& a': {
          color: 'primary.contrastText',
          textDecoration: 'none',
        },
  
    }}
    >
        <Typography align='center' color='white' variant='h6'>
            &copy; {new Date().getFullYear()} Your Website. All rights reserved.
            
        </Typography>

    </Box>
  )
}

export default Footer

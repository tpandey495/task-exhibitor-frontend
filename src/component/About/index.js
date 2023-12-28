import React from 'react';
import { Grid, Typography, useMediaQuery } from "@mui/material";
import about1 from 'assets/images/about1.png';
import about2 from 'assets/images/about2.png';
import './about.css';

const About = () => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const aboutText = (
        <Typography variant="h6">
            Task Exhibitor, an intuitive task management app, 
            utilizes the Eisenhower Matrix for efficient task prioritization. 
            With its user-friendly interface, it simplifies task organization. 
            Additionally, it tracks daily hours, offering insights into time 
            spent on various tasks, aiding analysis and improvement. Ideal 
            for optimizing productivity and time management.
        </Typography>
    );

    const gridItemStyle = {
        margin: isSmallScreen ? "0px auto 50px auto" : "150px auto 0px auto",
    };

    return (
        <>
            <Grid container spacing={10} justifyContent="space-between">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <img src={about1} alt="About" loading='lazy' width="100%" />
                </Grid>
                <Grid item xs={10} sm={8} md={6} lg={4} sx={gridItemStyle}>
                    {aboutText}
                </Grid>
            </Grid>
            <Grid container spacing={10} direction="row-reverse" justifyContent="space-between">
                <Grid item xs={10} sm={12} md={6} lg={6} >
                    <img src={about2} alt="About"  loading='lazy' width="100%"/>
                </Grid>
                <Grid item xs={10} sm={8} md={6} lg={4} sx={gridItemStyle}>
                    {aboutText}
                </Grid>
            </Grid>
        </>
    );
};

export default About;


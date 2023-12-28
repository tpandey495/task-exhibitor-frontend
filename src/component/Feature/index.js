import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Typography } from "@mui/material";
import FeatureData from 'config/featuresData';
import './feature.css';

const Feature = () => {
  return (
    <Box className="features">
      <Typography variant="h3">Features</Typography>
      <Box className="features-cared-wrapper">
        {
          FeatureData.map((item) =>
            <Card className="features-card" key={item?.id}>
              <Box className="features-card-circle">
                <CardMedia className="features-img" component="img" image={item?.img_path} alt="imgae" />
              </Box>
              <CardContent>
                <Typography variant="h5">{item?.title}</Typography>
                <Typography className="features-card-description" variant="body2" paragraph='true' align='left'>
                  {item?.description}
                </Typography>
              </CardContent>
            </Card>
          )
        }
      </Box>
    </Box>
  )
}

export default Feature;
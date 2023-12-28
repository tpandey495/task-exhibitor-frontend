import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import testinomail from "../../config/testinomail";
import quotation from 'assets/images/quotation.png';
import {Box,Typography} from "@mui/material";
import  './testinomail.css';

const MediaCard=()=> {
    return (
     <Box className="testinomail">
        <Typography variant="h3">Testimonial</Typography>
        <Box className="card-wrapper">
        {
        testinomail&&testinomail.map((elem)=>{
          return <Card className="testinomail-card" key={elem?.id} sx={{backgroundColor:elem?.bg_color}}>
                    <CardMedia className="card-media1" component="img" image={quotation} alt="imgae"/>
                    <CardContent sx={{mt:"10px"}}>
                        <Typography gutterBottom variant="h5" component="div">{elem?.user_name}</Typography>
                        <Typography variant="p">
                        {elem?.review}
                        </Typography>
                    </CardContent>
                    <img className="card-media2" component="img" src={elem?.img_path} alt="imgae"/>
                 </Card>  
           })
         }
        </Box>
     </Box>
    
  );
}

export default  MediaCard;
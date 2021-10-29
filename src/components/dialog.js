import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import '../userCrud.scss';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";



const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [ name , setName  ] = useState('');
  const [ job , setJob  ] = useState('');
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(()=>{
    console.log(props , "val");
   if(props.type === 'Update'){
     setName(`${props?.selectedValue?.first_name} ${props?.selectedValue?.last_name}` )
     setJob(props?.selectedValue?.email)
   }

  },[props])

  const handleClose = () => {
    onClose(selectedValue);
    setName('');
    setJob('')
  };
const handleName = (e) => {
  console.log(e.target.value , "eve");
  setName(e.target.value);
}
const handleJob = (e) => {
  console.log(e.target.value , "eve");
  setJob(e.target.value);
}
  const handleListItemClick = (value) => {
    onClose(value);
  };

  const submit = () => {
    if( name !== '' && regexEmail.test(job)  ){
      if(props.type === 'Update'){
    axios
    .put(`${config.url}users/${props.selectedValue.id}`,{
        name : name ,
        email: job
    })
    .then((res) => {
      console.log(res, "res");
      handleClose()
      props.handleRefresh(res)
    })
    .catch((error) => {
      console.log(error);
    });
  } else {
    axios
    .post(`${config.url}users`,{
        name : name ,
        email: job
    })
    .then((res) => {
      console.log(res, "res");
      handleClose()
      props.handleRefresh()

    })
    .catch((error) => {
      console.log(error);
    });
  }
  } else {
    alert('Please Give Valid Name and Email')
  }
  }

  return (
    <div className='dialog-container' >
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className="dialog-container" >
      <div className='wholedialog' >
        <div className='dialogHead'>
      <DialogTitle id="simple-dialog-title" style={{fontWeight: 600}} >{props.type} Profile</DialogTitle>
      </div>
      <Divider variant="inset" style={{marginBottom: '10px', marginLeft: '0px' }} />
      <div className="input-area" >
      <TextField id="name" className="name-area" variant="outlined" value={name}  onChange={handleName} placeholder="Enter Your Full Name" />
      </div>
      <div className="input-area" style={{marginTop: '50px'}}>
      <TextField id="name" className="name-area" variant="outlined" value={job}  onChange={handleJob} label="Enter Your Email" />
      </div>
      <div className="input-area" style={{marginTop: '50px'}}>
      <Button variant="contained" color="primary" onClick={submit} >
        Submit
      </Button>
      </div>
      </div>
    </Dialog>
    </div>
  );
}

export default SimpleDialog


import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import TableHead from "@material-ui/core/TableHead";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import LaunchIcon from "@material-ui/icons/Launch";
import { useEffect } from "react";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import SimpleDialog from './dialog';
import axios from "axios";
import config from "../config";
import Button from '@material-ui/core/Button';








const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function UserTable(props) {
  const classes = useStyles2();


  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [ type , setType  ] = useState('')

  const handleClickOpen = (e , row) => {
    console.log(e);
    setSelectedValue(row);
    setType(e)
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleDelete = (id) => {
    axios
    .delete(`${config.url}users/${id}`)
    .then((res) => {
      console.log(res, "res");
      handleClose()
    })
    .catch((error) => {
      console.log(error);
    });
  }



  return (
    <TableContainer component={Paper}>
      <div className='create-area' style={{margin: '10px 50px' , display: 'flex' , justifyContent: 'flex-end'}}  >
      <Button variant="contained" color="primary" onClick={() => handleClickOpen('Create')}  value='create'  >
        Create User
      </Button>
        </div>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 160 }} align="left">
              Profile Image
            </TableCell>
            <TableCell style={{ width: 160 }} align="left">
              Name
            </TableCell>
            <TableCell style={{ width: 160 }} align="left">
              Email
            </TableCell>

            <TableCell style={{ width: 160 }} align="left">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            // (rowsPerPage > 0
            //   ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            //   : rows
            // )
            props.allUsers?.map((row) => (
              <TableRow key={row.name}>
                <TableCell style={{ width: 160 }} align="left">
                  <img src={row.avatar} alt="img" />
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.first_name} {row.last_name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.email}
                </TableCell>
                <TableCell
                  className="action-area"
                  style={{ width: 160 }}
                  align="left"
                >
                  <IconButton onClick={() => handleClickOpen('Update' , row)}  >
                    <LaunchIcon  />
                  </IconButton>
                  <IconButton>
                    <CancelPresentationIcon onClick={() => handleDelete(row.id)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          }

    
        </TableBody>
        <TableFooter>
          <TableRow>
            
          </TableRow>
        </TableFooter>
      </Table>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose}  type={type} handleRefresh={props.handleRefresh}  />
    </TableContainer>

  );
}

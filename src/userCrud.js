import React from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";
import config from "./config";
import UserTable from "./components/table";
import './userCrud.scss';

const UserCrud = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [ pageDetails , setPageDetails ] = useState('')

  const handleRefresh = () => {
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, []);




  const getUsers = () => {
    axios
      .get(`${config.url}users`)
      .then((res) => {
        console.log(res, "res");
        setAllUsers(res.data.data);
        setPageDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="user-container">
      <Paper>
        <div className="image-area">
          <img src="https://picsum.photos/1400/350" id="image-dynamic" />
        </div>
        <div className="welcome-area">
            <p >Welcome to User Section</p>
        </div>
        {/* {allUsers !== [] ? (
          <div>{allUsers && allUsers?.map((user) => <p>{user.email}</p>)}</div>
        ) : (
          <> test </>
        )} */}

        <div className='table-area' >
        <UserTable allUsers={allUsers}  pageDetails={pageDetails} handleRefresh={handleRefresh} />
        </div>

      </Paper>
    </div>
  );
};
export default UserCrud;

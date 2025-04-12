import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";


function UserList() {
  const users = models.userListModel();

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "background.paper",
        height: "100%",
        overflow: "auto",
      }}
      className="user-list"
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Người dùng
      </Typography>
      <Divider />
      <List component="nav">
        {users.map((item, index) => (
          <React.Fragment key={item._id}>
            <ListItem
              button
              component={RouterLink}
              to={`/users/${item._id}`}
            >
              <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            </ListItem>
            {index < users.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default UserList;
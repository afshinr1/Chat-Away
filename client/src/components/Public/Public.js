import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PublicRooms from "./PublicRooms/PublicRooms";

export default function Public() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div >
      <AppBar position="static" color="inherit">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered
          scrollButtons="auto"
        >
          <Tab label="People"/>
          <Tab label="Public Rooms"/>
        </Tabs>
      </AppBar>
     {value === 0 ? <h1>PeoplesComponent</h1> : <PublicRooms />}
 
    </div>
  );
}

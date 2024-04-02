import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../utils/theme";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Website
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Contact</Button>
          <Link to={"/activities"}>Activities</Link>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;

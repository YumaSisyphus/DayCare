import { Button, TextField, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const WelcomeScreen = () => {
  return (
    <div>
      <Typography>Hello</Typography>
      <Button>Buton</Button>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <TextField label="Test" />
      </Box>
    </div>
  );
};

export default WelcomeScreen;

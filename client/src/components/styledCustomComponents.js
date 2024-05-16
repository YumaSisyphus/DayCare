import { Colors } from "../utils/colors";
import { Link, styled } from "@mui/material";

export const StyledLink = styled(Link)(() => ({
  color: Colors.black,
  height: "50px",
  width: "90%",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "10%",
  textDecoration: "none",
  transition: ".4s",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: Colors.lightbg,
    borderRadius: "20px",
  },
}));

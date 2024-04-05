import { Box, TextField, debounce } from "@mui/material";

export default function SearchBar({ label, onSearch }) {
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <TextField
        label={label}
        variant="outlined"
        onChange={debounce((e) => {
          onSearch(e.target.value);
        }, 200)}
        size="small"
        // InputProps={{
        //   style: {
        //     color: Colours.grey,
        //   },
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <IconButton edge="end" disableRipple>
        //         <MicNoneIcon fontSize="small" />
        //       </IconButton>
        //     </InputAdornment>
        //   ),
        // }}
      />
      {/* <Button variant="contained" >
        <SearchIcon />
      </Button> */}
    </Box>
  );
}

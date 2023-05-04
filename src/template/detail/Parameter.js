import {TextField} from "@mui/material";

export default function Parameter({parameter, handleOnChange}) {
  return (
    <>
      {/*{parameter.name}*/}
      <TextField id="standard-basic"
                 value={parameter.value}
                 label={parameter.name}
                 variant="standard"
                 // onBlur={handleOnBlur}
                 onChange={handleOnChange}
      />
      {/*<input*/}
      {/*  value={parameter.value}*/}
      {/*  onChange={handleChange}*/}
      {/*  size={100}*/}
      {/*/>*/}
    </>
  );
}
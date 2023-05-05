import {TextField} from "@mui/material";
import {useRef, useState} from "react";

export default function Parameter({parameter, handleOnChange}) {
  const [text, setText] = useState(parameter.value);
  return (
    <>
      {/*{parameter.name}*/}
      <TextField
        sx={{m: 1, width: '125ch'}}
        size={"small"}
        id="standard-basic"
        value={text}
        label={parameter.name}
        variant="standard"
        onBlur={handleOnChange}
        onChange={e => setText(e.target.value)}
      />
      {/*<input*/}
      {/*  value={parameter.value}*/}
      {/*  onChange={handleChange}*/}
      {/*  size={100}*/}
      {/*/>*/}
    </>
  );
}
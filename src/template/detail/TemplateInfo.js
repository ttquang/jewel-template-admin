import {TextField} from "@mui/material";

export default function TemplateInfo({inName, handleChange}) {
  return (
    <>
      <TextField id="outlined-basic" label="Template Name" variant="outlined"
                 value={inName} onChange={handleChange}/>
      {/*<input*/}
      {/*  placeholder="Template Name"*/}
      {/*  value={inName}*/}
      {/*  onChange={handleChange}*/}
      {/*/>*/}
    </>
  );
}

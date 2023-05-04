import {v4 as uuid} from 'uuid';
import Parameter from "./Parameter";
import {useState} from "react";
import axios from "axios";
import {MenuItem, Select} from "@mui/material";

export function Element({inElement}) {
  const [status, setStatus] = useState('');
  const [element, setElement] = useState(inElement);

  async function handleTextChangedAsync(text) {
    if (text) {
      await axios
        .get("http://localhost:8080/templates/" + text + "/parameters")
        .then((response) => {
          let parameters = response.data;
          parameters = parameters.map(parameter => {
            return {
              id: uuid(),
              name: parameter
            }
          });
          setElement({type: text, parameters: parameters});
        }).catch((reason) => {
          console.log(reason)
          setElement({type: text, parameters: []});
        });
    } else {
      setElement({type: text, parameters: []});
    }
  }

  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={element.type}
        label="Age"
        onChange={e => handleTextChangedAsync(e.target.value)}
      >
        <MenuItem value={1}>Click</MenuItem>
        <MenuItem value={2}>Input</MenuItem>
      </Select>
      {/*<input*/}
      {/*  value={element.type}*/}
      {/*  onChange={e => handleTextChangedAsync(e.target.value)}*/}
      {/*/>*/}
      <ul>
        {element.parameters.map(parameter => (
          <li key={uuid()}>
            <Parameter parameter={parameter}
              // handleChange={(e) => handleParameterChanged(parameter.id, e)}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

const options = [
  {value: '1', label: 'Click'},
  {value: '2', label: 'Input'}
]
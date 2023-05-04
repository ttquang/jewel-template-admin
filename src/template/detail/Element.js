import {v4 as uuid} from 'uuid';
import Parameter from "./Parameter";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, MenuItem, Select} from "@mui/material";

export function Element({inElement, handleSave}) {
  const [element, setElement] = useState(inElement);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const {data: response} = await axios.get('http://192.168.1.24:8080/templates');
        setTemplates(response);
      } catch (error) {
        console.error(error.message);
      }
      // setLoading(false);
    }

    fetchData();
  }, []);

  async function handleTextChangedAsync(text) {
    if (text) {
      await axios
        .get("http://192.168.1.24:8080/templates/" + text + "/parameters")
        .then((response) => {
          let parameters = response.data;
          parameters = parameters.map(parameter => {
            return {
              id: uuid(),
              name: parameter
            }
          });
          setElement({id: element.id, type: text, parameters: parameters});
        }).catch((reason) => {
          console.log(reason)
          setElement({type: text, parameters: []});
        });
    } else {
      setElement({type: text, parameters: []});
    }
  }

  function handleParameterChanged(name, e) {
    let parameters = element.parameters.map(p => {
      if (p.name === name) {
        return {...p, value: e.target.value};
      } else {
        return p;
      }
    });
    setElement({...element, parameters: parameters});
  }

  function handleSaveElement(e) {
    handleSave(element);
  }

  return (
    <>
      <Select
        size={"small"}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={element.type}
        onChange={e => handleTextChangedAsync(e.target.value)}
      >
        {templates.map(template => (
          <MenuItem key={template.code} value={template.code}>
            {template.name}
          </MenuItem>
        ))}
        {/*<MenuItem value={1}>Click</MenuItem>*/}
        {/*<MenuItem value={2}>Input</MenuItem>*/}
      </Select>
      <Button size={"small"} variant="contained" onClick={e => handleSaveElement(e)}>Save</Button>
      {/*<Button variant="contained" onClick={handleAdd}>Add</Button>*/}
      {/*<input*/}
      {/*  value={element.type}*/}
      {/*  onChange={e => handleTextChangedAsync(e.target.value)}*/}
      {/*/>*/}
      <ul>
        {element.parameters.map(parameter => (
          <li key={uuid()}>
            <Parameter parameter={parameter}
                       handleOnChange={e => handleParameterChanged(parameter.name, e)}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
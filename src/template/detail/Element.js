import {v4 as uuid} from 'uuid';
import Parameter from "./Parameter";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Accordion, AccordionDetails, AccordionSummary, MenuItem, Select} from "@mui/material";
import {ElementsDispatchContext} from "./Template";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function Element({element, templateCode}) {
  const elementsDispatch = useContext(ElementsDispatchContext);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const {data: response} = await axios.get('http://localhost:8080/templates');
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
        .get("http://localhost:8080/templates/" + text + "/parameters")
        .then((response) => {
          let parameters = response.data;
          parameters = parameters.map(parameter => {
            return {
              id: uuid(),
              name: parameter
            }
          });
          elementsDispatch({
            type: 'element-update',
            element: {id: element.id, type: text, parameters: parameters}
          });
          // setElement({id: element.id, type: text, parameters: parameters});
        }).catch((reason) => {
          console.log(reason)
          elementsDispatch({
            type: 'element-update',
            element: {id: element.id, type: text, parameters: []}
          });
        });
    } else {
      elementsDispatch({
        type: 'element-update',
        element: {id: element.id, type: text, parameters: []}
      });
    }
  }

  function handleParameterChanged(name, e) {
    let parameters = element.parameters.map(p => {
      if (p.name === name) {
        return {...p, id: uuid(), value: e.target.value};
      } else {
        return {...p, id: uuid()};
      }
    });
    let newElement = {...element, parameters: parameters};
    elementsDispatch({
      type: 'element-update',
      element: newElement
    });
  }

  // function handleParameterChanged(name, e) {
  //   let parameters = element.parameters.map(p => {
  //     if (p.name === name) {
  //       return {...p, value: e.target.value};
  //     } else {
  //       return p;
  //     }
  //   });
  //   setElement({...element, parameters: parameters});
  // }
  //
  // function handleSaveElement(e) {
  //   handleSave(element);
  // }

  return (
    <>
      <Accordion key={element.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
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
          </Select>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            {element.parameters.map(parameter => (
              <li key={uuid()}>
                <Parameter parameter={parameter}
                           handleOnChange={(e) => handleParameterChanged(parameter.name, e)}
                />
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>

      {/*<Button size={"small"} variant="contained" onClick={e => handleSaveElement(e)}>Save</Button>*/}
      {/*<Button variant="contained" onClick={handleAdd}>Add</Button>*/}
      {/*<input*/}
      {/*  value={element.type}*/}
      {/*  onChange={e => handleTextChangedAsync(e.target.value)}*/}
      {/*/>*/}

    </>
  )
}
import {useNavigate, useParams} from "react-router-dom"
import {createContext, useContext, useEffect, useReducer, useState} from "react";
import axios from "axios";
import {v4 as uuid} from 'uuid';
import TemplateInfo from "./TemplateInfo";
import {Element} from "./Element";
import {Button} from "@mui/material";

export const ElementsContext = createContext([]);
export const ElementsDispatchContext = createContext(null);

export function Template() {
  const {code} = useParams();
  const [name, setName] = useState('');
  // const [elements, setElements] = useState([]);
  const navigate = useNavigate();

  const [elements, dispatch] = useReducer(
    elementsReducer,
    []
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: response} = await axios.get('http://192.168.1.24:8080/templates/' + code);
        setName(response.name);

        dispatch({
          type: 'load',
          elements: response.elements
        });
        // setElements(response.elements.map(element => {
        //   return {...element, id: uuid()};
        // }));
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, [code]);

  return (
    <>
      <TemplateInfo inName={name} handleChange={(e) => setName(e.target.value)}/>
      <ElementsContext.Provider value={elements}>
        <ElementsDispatchContext.Provider value={dispatch}>
          {elements.map(element => (
            <Element element={element} templateCode={code}/>
          ))}
        </ElementsDispatchContext.Provider>
      </ElementsContext.Provider>
      <Button variant="contained" onClick={() => {
        createTemplate(code, name, elements);
        navigate("/templates");
      }}>Save</Button>
      <Button variant="contained" onClick={() => {
        dispatch({
          type: 'add'
        });
      }}>Add</Button>
    </>
  )
}

function createTemplate(code, name, elements) {
  axios
    .put('http://192.168.1.24:8080/templates', {
      name: name,
      code: code,
      elements: elements
    })
    .then((response) => {
      console.log(response.data);
    });
}

function elementsReducer(elements, action) {
  switch (action.type) {
    case 'load': {
      return action.elements.map(element => {
        return {...element, id: uuid()};
      });
    }
    // case 'save': {
    //   updateTemplate(action.name, elements)
    //   return elements;
    // }
    case 'view': {
      console.log(elements);
      return elements;
    }
    case 'add': {
      return [...elements, {
        id: uuid(),
        type: "",
        parameters: []
      }];
    }
    case 'added-after': {
      let insertAt = elements.findIndex(task => task.id === action.id) + 1;
      return [...elements.slice(0, insertAt),
        {
          id: uuid(),
          name: 'unknown',
          parameters: [],
          done: false
        },
        ...elements.slice(insertAt)];
    }
    case 'element-update': {
      console.log(action);
      return elements.map(t => {
        if (t.id === action.element.id) {
          return action.element;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return elements.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export function useElements() {
  return useContext(ElementsContext);
}

export function useElementsDispatch() {
  return useContext(ElementsDispatchContext);
}
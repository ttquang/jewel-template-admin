import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from "axios";
import {v4 as uuid} from 'uuid';
import TemplateInfo from "./TemplateInfo";
import {Element} from "./Element";
import {Button} from "@mui/material";

export function Template() {
  const [loading, setLoading] = useState(true);
  const {code} = useParams()
  const [name, setName] = useState('');
  const [elements, setElements] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const {data: response} = await axios.get('http://192.168.1.24:8080/templates/' + code);
        setName(response.name);

        setElements(response.elements.map(element => {
          return {...element, id: uuid()};
        }));
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  function handleSaveElement(updateElement) {
    return setElements(elements.map(element => {
      if (element.id === updateElement.id) {
        return updateElement;
      } else {
        return element;
      }
    }));
  }

  function handleAdd() {
    return setElements([...elements, {
      id: uuid(), type: "", parameters: []
    }]);
  }

  return (
    <>
      <TemplateInfo inName={name} handleChange={(e) => setName(e.target.value)}/>
      <ul>
        {elements.map(element => (
          <li key={element.id}>
            <Element inElement={element}
                     handleSave={handleSaveElement}
              // handleAdd={handleAdd}
            />
          </li>
        ))}
      </ul>

      <Button variant="contained" onClick={() => {
        createTemplate(code, name, elements);
        navigate("/templates");
      }}>Save</Button>
      <Button variant="contained" onClick={handleAdd}>Add</Button>
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
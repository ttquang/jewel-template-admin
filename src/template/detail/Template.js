import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from "axios";
import {v4 as uuid} from 'uuid';
import TemplateInfo from "./TemplateInfo";
import {Element} from "./Element";

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
        const {data: response} = await axios.get('http://localhost:8080/templates/' + code);
        setName(response.name);
        setElements(response.elements);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      <TemplateInfo inName={name} handleChange={(e) => setName(e.target.value)}/>
      <ul>
        {elements.map(element => (
          <li key={uuid()}>
            <Element inElement={element}/>
          </li>
        ))}
      </ul>
      <button onClick={() => {
        createTemplate(code, name, elements);
        navigate("/templates");
      }}>Save
      </button>
    </>
  )
}

function createTemplate(code, name, elements) {
  axios
    .put('http://localhost:8080/templates', {
      name: name,
      code: code,
      elements: elements
    })
    .then((response) => {
      console.log(response.data);
    });
}
import {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import axios from "axios";
import {Link} from "react-router-dom";

export function TemplateList() {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const {data: response} = await axios.get('http://localhost:8080/templates');
        setTemplates(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <><h1>Template List</h1>
      <ul>
        {templates.map(template => (
          <li key={uuid()}>
            <Link to={"/templates/" + template.code}>{template.name}</Link>
            <ul>
              {template.elements.map(element => (
                <li key={uuid()}>{element.type}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}
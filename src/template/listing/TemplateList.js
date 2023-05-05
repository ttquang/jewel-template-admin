import {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";

export function TemplateList() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: response} = await axios.get('http://192.168.1.24:8080/templates');
        setTemplates(response);
        setFilteredTemplates(response);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, [location.key]);

  function createTemplate() {
    axios
      .post('http://192.168.1.24:8080/templates', {
        name: 'Unknown',
        elements: []
      })
      .then((response) => {
        navigate("/templates");
        console.log(response.data);
      });
  }

  function duplicateTemplate(code) {
    axios
      .post('http://192.168.1.24:8080/templates/' + code + '/duplicate', {})
      .then((response) => {
        navigate("/templates");
        console.log(response.data);
      });
  }

  function filterTemplate(name) {
    setFilteredTemplates(templates.filter((t) => t.name.includes(name)));
  }

  return (
    <><h1>Template List</h1>
      <TextField
        sx={{m: 1, width: '125ch'}}
        size={"small"}
        id="standard-basic"
        label={'Filter'}
        variant="standard"
        onChange={(e) => filterTemplate(e.target.value)}
      />
      <Button size={"small"} variant="contained" onClick={createTemplate}>Add</Button>

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Code</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTemplates.map(template => (
              <TableRow
                key={uuid()}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell align="right">
                  <Button size={"small"} variant="contained"
                          onClick={() => duplicateTemplate(template.code)}>Duplicate</Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link to={"/templates/" + template.code}>{template.name}</Link>
                </TableCell>
                <TableCell align="right">{template.code}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/*<ul>*/}
      {/*  {templates.map(template => (*/}
      {/*    <li key={uuid()}>*/}
      {/*      <Link to={"/templates/" + template.code}>{template.name}</Link>*/}
      {/*      <Button size={"small"} variant="contained" onClick={() => duplicateTemplate(template.code)}>Duplicate</Button>*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </>
  )
}
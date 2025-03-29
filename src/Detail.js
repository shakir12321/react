import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { useParams, Link } from "react-router-dom";

function Detail() {
  //   const [workItems, setWorkItems] = useState([]);

  const pageParams = useParams();

  const [workItem, setWorkItem] = useState(false);

  useEffect(() => {
    let headers;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("Using the PAT from .env");
      headers = {
        Authorization: `Bearer ${process.env.REACT_APP_POLARION_TOKEN}`,
      };
    } else {
      console.log("Using the REST Token from session");
      headers = {
        "X-Polarion-REST-Token": window.getRestApiToken(),
      };
    }

    const projectId = "restdemo";
    const params = {
      fields: {
        workitems: "@all",
      },
    };
    axios
  .get('http://ec2amaz-fk4qupb/polarion/rest/v1/all/workitems', { params, headers })
  .then((response) => {
    console.log(response.data.data);
    setWorkItem(response.data.data);
  })
  .catch((error) => {
    console.error('Error fetching workitems:', error);
  });

  
  }, [pageParams.workItem]);

  if (!workItem) {
    return <h1>Loading..</h1>;
  } else {
    return (
      <div className="App">
        <Link to="/">← Back</Link>
        <h1>
          {workItem.attributes.id} - {workItem.attributes.title}
        </h1>
        <table id="myTable">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{workItem.attributes.id}</td>
            </tr>
            <tr>
              <td>Title</td>
              <td>{workItem.attributes.title}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{workItem.attributes.description.value}</td>
            </tr>
            <tr>
              <td>Severity</td>
              <td>{workItem.attributes.severity}</td>
            </tr>
            <tr>
              <td>Priority</td>
              <td>{workItem.attributes.priority}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Detail;

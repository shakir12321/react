import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Link, useParams } from "react-router-dom";

function Detail() {
  // Extract the work item id from the URL.
  const { workItem } = useParams();

  // We initialize "item" to null to indicate the detail data hasn't loaded yet.
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Prepare headers for the API request.
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

    // Construct the URL for a single work item.
    // Here we assume your project id is "testproject".
    const url = `http://ec2amaz-fk4qupb/polarion/rest/v1/projects/testproject/workitems/${encodeURIComponent(
      workItem
    )}`;

    // Make the API request to get details for the selected work item.
    axios
      .get(url, { headers })
      .then((response) => {
        console.log("Detail API Response:", response.data);
        // Assuming the detailed work item data is in response.data.data.
        setItem(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching work item detail:", error);
        setItem(null);
      });
  }, [workItem]);

  // Display a loading message while the data is being fetched.
  if (!item) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <Link to="/">← Back</Link>
      <h1>
        {item.attributes.id} - {item.attributes.title}
      </h1>
      <table id="detailTable" border="1" cellPadding="5" cellSpacing="0">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{item.attributes.id}</td>
          </tr>
          <tr>
            <td>Title</td>
            <td>{item.attributes.title}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{item.attributes.description && item.attributes.description.value}</td>
          </tr>
          <tr>
            <td>Severity</td>
            <td>{item.attributes.severity}</td>
          </tr>
          <tr>
            <td>Priority</td>
            <td>{item.attributes.priority}</td>
          </tr>
          {/* Add other fields as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default Detail;

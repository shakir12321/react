import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Link, useParams } from "react-router-dom";

function Detail() {
  const { workItem } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    let headers;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      headers = {
        Authorization: `Bearer ${process.env.REACT_APP_POLARION_TOKEN}`,
      };
    } else {
      headers = {
        "X-Polarion-REST-Token": window.getRestApiToken(),
      };
    }

    // Fetch the full JSON response
    // const url = `http://ec2amaz-fk4qupb/polarion/rest/v1/projects/testproject/workitems/${encodeURIComponent(
    const url = `/polarion/rest/v1/projects/testproject/workitems/${encodeURIComponent(
      workItem
    )}`;

    axios
      .get(url, { headers })
      .then((response) => {
        console.log("Full API Response:", response.data);
        // Store the entire response.data
        setItem(response.data);
      })
      .catch((error) => {
        console.error("Error fetching work item detail:", error);
        setItem(null);
      });
  }, [workItem]);

  // If no data yet, show a loading state.
  if (!item) {
    return <h1>Loading...</h1>;
  }

  // For convenience, reference item.links and item.data in short variables
  const topLinks = item.links;
  const data = item.data;
  const attrs = data?.attributes;
  const rels = data?.relationships;

  return (
    <div className="App">
      <Link to="/">← Back</Link>
      <h2>Work Item Detail</h2>

      {/* Display top-level "links" */}
      <h3>Top-Level Links</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <tbody>
          <tr>
            <td>self</td>
            <td>{topLinks?.self}</td>
          </tr>
        </tbody>
      </table>

      {/* Display data object */}
      <h3>Data</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <tbody>
          <tr>
            <td>type</td>
            <td>{data?.type}</td>
          </tr>
          <tr>
            <td>id</td>
            <td>{data?.id}</td>
          </tr>
        </tbody>
      </table>

      {/* Display attributes */}
      <h3>Attributes</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{attrs?.id}</td>
          </tr>
          <tr>
            <td>Title</td>
            <td>{attrs?.title}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{attrs?.type}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{attrs?.status}</td>
          </tr>
        </tbody>
      </table>

      {/* Display relationships */}
      <h3>Relationships</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <tbody>
          <tr>
            <td>Project ID</td>
            <td>{rels?.project?.data?.id}</td>
          </tr>
          <tr>
            <td>Project relationship link</td>
            <td>{rels?.project?.links?.self}</td>
          </tr>
        </tbody>
      </table>

      {/* Display data.links (distinct from top-level links) */}
      <h3>Data Links</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <tbody>
          <tr>
            <td>self</td>
            <td>{data?.links?.self}</td>
          </tr>
          <tr>
            <td>portal</td>
            <td>{data?.links?.portal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Detail;

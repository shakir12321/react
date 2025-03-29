import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Table() {
  // Create state for the list of work items.
  const [workItems, setWorkItems] = useState([]);

  useEffect(() => {
    // Build headers with the Bearer token.
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_POLARION_TOKEN}`,
    };

    // Define the API endpoint for all work items.
    const url = "http://ec2amaz-fk4qupb/polarion/rest/v1/all/workitems";

    // Make the GET request.
    axios
      .get(url, { headers })
      .then((response) => {
        console.log("Response data:", response.data);
        // Update state with the list of work items from response.data.data.
        setWorkItems(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching workitems:", error);
      });
  }, []); // Runs once when the component mounts.

  return (
    <div>
      <h2>Work Items</h2>
      {workItems.length === 0 ? (
        <p>No work items found.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>#</th>
              <th>Work Item ID</th>
              <th>API Link</th>
              <th>Portal Link</th>
            </tr>
          </thead>
          <tbody>
            {workItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {/* Clicking on the work item id navigates to the Detail view.
                      The URL parameter is the work item id. */}
                  <Link to={`/${encodeURIComponent(item.id)}`}>
                    {item.id}
                  </Link>
                </td>
                <td>
                  <a href={item.links.self} target="_blank" rel="noopener noreferrer">
                    API View
                  </a>
                </td>
                <td>
                  <a href={item.links.portal} target="_blank" rel="noopener noreferrer">
                    Portal View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;

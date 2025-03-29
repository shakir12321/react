import React, { useEffect, useState } from "react";
import axios from "axios";

function Table() {
  const [workItems, setWorkItems] = useState([]);

  useEffect(() => {
    // Build the headers
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_POLARION_TOKEN}`, // Prepend "Bearer "
    };

    // Example endpoint
    const url = "http://ec2amaz-fk4qupb/polarion/rest/v1/all/workitems";

    // Make the GET request
    axios
      .get(url, { headers })
      .then((response) => {
        console.log("Response data:", response.data);
        setWorkItems(response.data.workItems || []);
      })
      .catch((error) => {
        console.error("Error fetching workitems:", error);
      });
  }, []);

  // Render your data
  return (
    <div>
      <h2>Work Items</h2>
      <ul>
        {workItems.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Table;

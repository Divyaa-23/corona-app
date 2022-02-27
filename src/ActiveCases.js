import React from "react";
import "./ActiveCases.css";

function ActiveCases({ countries }) {
  return (
    <div>
      <table className="table">
        {countries.map((country) => (
          <tr>
            <td>{country.country}</td>
            <td>
              <strong>{country.cases}</strong>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ActiveCases;

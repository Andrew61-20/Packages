import React from "react";

export default ({pckg, active, update, index}) => {
  return (
    active !== null && active+1 === pckg.id ? 
      <tr onClick={() => update({active: index})}>
        <td>{pckg.number}✔</td>
        <td>{pckg.status}</td>
        <td>{pckg.location}</td>
        <td>{pckg.count}</td>
      </tr>       
          :
      <tr onClick={() => update({active: index})}>
        <td>{pckg.number}</td>
        <td>{pckg.status}</td>
        <td>{pckg.location}</td>
        <td>{pckg.count}</td>
      </tr>
    );
}
import React from "react";

export default ({pckg, active, update}) => {
  return (
      active !== null && active === pckg.id ? 
        <tr onClick={() => update({active: pckg.id})}>
          <td>{pckg.number}✔</td>
          <td>{pckg.status}</td>
          <td>{pckg.location}</td>
          <td>{pckg.count}</td>
        </tr>
          :
        <tr onClick={() => update({active: pckg.id})}>
          <td>{pckg.number}</td>
          <td>{pckg.status}</td>
          <td>{pckg.location}</td>
          <td>{pckg.count}</td>
        </tr>
  )
}
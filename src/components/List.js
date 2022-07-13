import React from "react";
import "./App.css";

export default function Link(props) {
  return (
    <tr>
      <th>{props.id}</th>
      <td style={{ fontWeight: props.weight }}>
        {props.name.substring(0, 15)}
        {props.name.length > 15 ? "..." : ""}
      </td>
      {/* <td style={{ fontWeight: props.weight }}>
        {props.description.substring(0, 15)}
        {props.description.length > 15 ? "..." : ""}
      </td> */}
      <td style={{ fontWeight: props.weight }}>{props.type}</td>
      <td style={{ fontWeight: props.weight }}>
        {props.owner !== "Owner"
          ? props.owner.substring(0, 6) +
            "...." +
            props.owner.substring(props.owner.length - 6)
          : "Owner"}
      </td>
      <td style={{ fontWeight: props.weight }}>
        {props.time === "Upload Time"
          ? props.time
          : new Date(props.time * 1000).toISOString().substring(0, 10) +
            " " +
            new Date(props.time * 1000).toISOString().substring(11, 19)}
      </td>      
      <td style={{ fontWeight: props.weight }}>{props.size==="Size"?"Size":Math.round(props.size/1000)+" KB"}</td>
      <td style={{ fontWeight: props.weight }}>
        <a
          href={props.hash === "" ? "" : props.hash}
          className={props.hash === "URL" ? "noURL" : "URL"}
          target="_blank"
          rel="noreferrer"
        >
          {props.hash === "URL" ? "URL" : "Click Here"}
        </a>
      </td>
    </tr>
  );
}

import React from "react";

const CompletedForm = props => {
  return (
    <div>
      {props.members.map(members => {
        return (
          <div>
            <h1>{members.name}</h1>
            <h2>{members.email}</h2>
            <p>{members.role}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CompletedForm;
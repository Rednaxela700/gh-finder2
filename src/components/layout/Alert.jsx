import React from "react";

export const Alert = ({ alert }) => {
  if (alert !== null) {
    return (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"></i>
        <span>{alert.msg}</span>
      </div>
    );
  }
  return null;
};

import React from 'react';
import './Dialog.css';

const Dialog = ({ handleClose, user }) => {
  return (
    <div className="dialog-container">
      <div className="dialog">
        <button className="close-button" onClick={handleClose}>Close</button>
        <div className="dialog-content">
          {user && (
            <div>
              <h2>User Details</h2>
              <p>Username: {user.username}</p>
              <p>Mobile: {user.mobile}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;

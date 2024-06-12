import React from "react";

const ConfirmationToast = ({ message, onConfirm }) => {
    return (
        <div>
            <div>{message}</div>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={toast.dismiss}>No</button>
        </div>
    );
};

export default ConfirmationToast;

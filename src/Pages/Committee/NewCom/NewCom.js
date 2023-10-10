import React from "react";

const NewCom = () => {
  return (
    <>
      <input type="checkbox" id="newCom-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label htmlFor="newCom-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action"></div>
        </div>
      </div>
    </>
  );
};

export default NewCom;

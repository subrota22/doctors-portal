import React from 'react';

const ConfrimModal = ({title  , text , closeModal , handleDelete  , modalData ,}) => {
console.log(modalData);
return (
 <>
<input type="checkbox" id="confirmModal" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{title} </h3>
    <p className="py-4">
      {text}
    </p>
    <div className="modal-action">
<div className="flex justify-between">
<label htmlFor="confirmModal" className="btn" 
 onClick={closeModal}> Cancel </label>
  <button className="btn btn-error mx-3"
   onClick={ () => handleDelete(modalData)}> Delete </button>
</div>
    </div>
  </div>
</div>
</>
    );
};

export default ConfrimModal;
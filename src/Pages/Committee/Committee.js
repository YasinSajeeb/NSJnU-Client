import React from "react";
import './Committee.css';
import NewCom from "./NewCom/NewCom";

const Committee = () => {
  return (
    <div className="my-10 text-center">
    <div className="flex flex-col md:flex-row md:justify-evenly gap-y-7">
    <div>
    <div className="animated-border-box-glow"></div>
      <div className="card mx-auto w-11/12 md:w-4/5 lg:w-96 bg-base-100 shadow-xl animated-border-box president-card">
        <figure className="px-10 pt-10">
          <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl"/>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      </div>
    <div>
    <div className="animated-border-box-glow"></div>
      <div className="card mx-auto w-11/12 md:w-4/5 lg:w-96 bg-base-100 shadow-xl animated-border-box gs-card">
        <figure className="px-10 pt-10">
          <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl"/>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      </div>
      </div>

      <label htmlFor="newCom-modal" className="btn btn-newCom mt-5">Create New Committee List</label>
      <NewCom></NewCom>
    </div>
  );
};

export default Committee;

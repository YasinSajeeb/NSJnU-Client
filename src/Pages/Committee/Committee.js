import React from "react";
import "./Committee.css";
import NewCom from "./NewCom/NewCom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../Shared/Loading/Loading";

const Committee = () => {

  const queryClient = useQueryClient();

  const { data: committeeMembers, isLoading, refetch } = useQuery({
    queryKey: ["committeeMembers"],
    queryFn: async () => {
      try {
        const res = await fetch("https://nsjnu-server.vercel.app/committeeMembers", {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });

  const handleDeleteAll = async () =>{
    try{
      await fetch("https://nsjnu-server.vercel.app/committeeMembers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`
        }
      });

      await queryClient.invalidateQueries("committeeMembers");
      await refetch();

    } catch (error){
      console.error("Error deleting all committee members:", error)
    }
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  const president = committeeMembers.find(
    (member) => member.position === "President"
  );
  const generalSecretary = committeeMembers.find(
    (member) => member.position === "General Secretary"
  );
  const otherMembers = committeeMembers.filter(
    (member) =>
      member.position !== "President" && member.position !== "General Secretary"
  );

  return (
    <div className="my-10 text-center">
      <h4 className="text-2xl text-green-950 font-extrabold">Executive Committee of</h4>
      <div className="flex flex-col md:flex-row md:justify-evenly gap-y-7">
        {president && (
          <div key={president._id}>
            <div className="animated-border-box-glow"></div>
            <div className="card card-compact bg-base-100 shadow-xl animated-border-box president-card">
              <figure>
                <img
                  src={president.photoURL}
                  alt="President"
                  className="rounded-xl object-cover w-80 h-80"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{president.name}</h2>
                <p>{president.position}</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {generalSecretary && (
          <div key={generalSecretary._id}>
            <div className="animated-border-box-glow"></div>
            <div className="card card-compact bg-base-100 shadow-xl animated-border-box gs-card">
              <figure>
                <img
                  src={generalSecretary.photoURL}
                  alt="generalSecretary"
                  className="rounded-xl object-cover w-80 h-80"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{generalSecretary.name}</h2>
                <p>{generalSecretary.position}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {otherMembers.map((member) => (
          <div key={member._id}>
            <div className="card w-auto bg-base-100 shadow-xl">
              <figure>
                <img
                  src={member.photoURL}
                  alt=""
                  className="rounded-xl object-cover w-full h-80"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{member.name}</h2>
                <p>{member.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
      <label htmlFor="newCom-modal" className="btn btn-newCom mt-5">
        Add A Committee Member
      </label>
      <NewCom
      hasPresident={Boolean(president)}
      hasGeneralSecretary={Boolean(generalSecretary)}
      refetch={refetch}
      ></NewCom>
      <div>
        <button onClick={handleDeleteAll} className="btn btn-newCom">Delete All</button>
    </div>
    </div>
    </div>
  );
};

export default Committee;

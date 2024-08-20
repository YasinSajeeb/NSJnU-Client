import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const EditModal = ({userData}) => {

  const [formData, setFormData] = useState(userData);
  const { register, handleSubmit } = useForm();
  const modalRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value
    }));
};


  const handleUpdateUser = async () => {
    try {
      console.log('Form Data:', formData);
      const response = await fetch(`https://nsjnu-server.vercel.app/members/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setFormData(updatedUser);
        console.log(updatedUser);
        alert('User details updated successfully!');
        closeModal();
      } else {
        throw new Error('Failed to update user details');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update user details');
    }
  };

  const closeModal = () => {
    modalRef.current.click();
  };

    return (
        <>
           <input type="checkbox" id="edit-modal" className="modal-toggle" ref={modalRef} />
<div className="modal" role="dialog" style={{zIndex: "2000"}}>
  <div className="modal-box">
    <h3 className="font-bold text-lg">Edit Your Details</h3>
    <form onSubmit={handleSubmit(handleUpdateUser)}>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input type='name' {...register("name")} name="displayName" value={formData.displayName} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Mobile Number</span>
          </label>
          <PhoneInput 
                  country={"bd"} 
                  enableSearch={true} 
                  inputStyle={{ width: "100%" }} 
                  value={formData.mobileNumber}
                  onChange={(phone) => setFormData({ ...formData, mobileNumber: phone })} // Set the value using setValue
                />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input type='text' {...register("companyName")} value={formData.companyName} onChange={handleChange} placeholder="Company Name" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Designation</span>
          </label>
          <input type='text' {...register("designation")} value={formData.designation} onChange={handleChange} placeholder="Name of your designation" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className='form-control'>
          <label className="label">
            <span className="label-text">Internship 1</span>
          </label>
          <input type='text' {...register("internship1")} value={formData.internship1} onChange={handleChange} placeholder="Internship Company" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className='form-control'>
          <label className="label">
            <span className="label-text">Internship 2</span>
          </label>
          <input type='text' {...register("internship2")} value={formData.internship2} onChange={handleChange} placeholder="Internship Company" className="input input-bordered w-full max-w-xs" />
        </div>

        <h4 className='text-lg font-bold mt-4'>Present Address</h4>
        <div className="form-control md:grid grid-cols-2 gap-4">
          <div>
          <label className="label">
            <span className="label-text">Street Address</span>
          </label>
          <textarea {...register("presentAddressStreet")} value={formData.presentAddressStreet} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="House no/village, Road, Thana etc."></textarea>
        </div>
        <div>
          <label className="label">
            <span className="label-text">District</span>
          </label>
          <input type='text' {...register("presentAddressDistrict")} value={formData.presentAddressDistrict} onChange={handleChange} className="input input-bordered w-full max-w-xs" placeholder="District"></input>
        </div>
        </div>
        <h4 className='text-lg font-bold mt-4'>Permanent Address</h4>
        <div className="form-control md:grid grid-cols-2 gap-4">
          <div>
          <label className="label">
            <span className="label-text">Street Address</span>
          </label>
          <textarea {...register("permanentAddressStreet")} value={formData.permanentAddressStreet} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="House no/village, Road, Thana etc."></textarea>
        </div>
        <div>
          <label className="label">
            <span className="label-text">District</span>
          </label>
          <input type='text' {...register("permanentAddressDistrict")} value={formData.permanentAddressDistrict} onChange={handleChange} className="input input-bordered w-full max-w-xs" placeholder="District"></input>
        </div>
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Your Batch</span>
          </label>
          <select {...register("batch")} value={formData.batch} onChange={handleChange} className="select select-bordered w-full max-w-xs">
            <option disabled selected>Batch No.</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Your Department</span>
          </label>
          <select {...register("department")} value={formData.department} onChange={handleChange} className="select select-bordered w-full max-w-xs">
            <option disabled selected>Your Department</option>
            <option value="Bangla">Bangla</option>
            <option value="English">English</option>
            <option value="History">History</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Islamic History & Culture">Islamic History & Culture</option>
            <option value="Islamic Studies">Islamic Studies</option>
            <option value="Music">Music</option>
            <option value="Theatre">Theatre</option>
            <option value="Fine Arts">Fine Arts</option>
            <option value="Physics">Physics</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Statistics">Statistics</option>
            <option value="Computer Science & Engineering">Computer Science & Engineering</option>
            <option value="Economics">Economics</option>
            <option value="Political Science">Political Science</option>
            <option value="Sociology">Sociology</option>
            <option value="Social Work">Social Work</option>
            <option value="Anthropology">Anthropology</option>
            <option value="Mass Communication & Journalism">Mass Communication & Journalism</option>
            <option value="Public Administration">Public Administration</option>
            <option value="Film & Television">Film & Television</option>
            <option value="Accounting & Information Systems">Accounting & Information Systems</option>
            <option value="Management Studies">Management Studies</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Law">Law</option>
            <option value="Land Management & Law">Land Management & Law</option>
            <option value="Geography & Environment">Geography & Environment</option>
            <option value="Botany">Botany</option>
            <option value="Zoology">Zoology</option>
            <option value="Psychology">Psychology</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Microbiology">Microbiology</option>
            <option value="Biochemistry & Molecular Biology">Biochemistry & Molecular Biology</option>
            <option value="Genetic Engineering & Biotechnology">Genetic Engineering & Biotechnology</option>
            <option value="Institute of Modern Language">Institute of Modern Language</option>
            <option value="Institute of Education & Research">Institute of Education & Research</option>
            </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Your Blood Group</span>
          </label>
          <select {...register("bloodGroup")} value={formData.bloodGroup} onChange={handleChange} className="select select-bordered w-full max-w-xs">
            <option disabled selected>Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="Not Tested Yet">Not Tested Yet</option>
            </select>
        </div>
        <button type="submit" className="btn mt-4">Submit</button>
        
        </form>
    <div className="modal-action">
      <label htmlFor="edit-modal" className="btn">Close!</label>
    </div>
  </div>
</div> 
        </>
    );
};

export default EditModal;
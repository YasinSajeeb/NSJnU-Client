import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { AiOutlineLoading } from 'react-icons/ai';


const Signup = () => {
  const { register, handleSubmit } = useForm();
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data) => {
    console.log(data);
    setIsLoading(true);

    const image = data.image[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "nsjnu2023");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddng2uach/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary.");
      }

      const imageData = await response.json();
      console.log(imageData);

      const userCredential = await createUser(data.email, data.password);
      const user = userCredential.user;
      const userInfo = {
        displayName: data.name,
        email: data.email,
        mobileNumber: data.number,
        photoURL: imageData.secure_url,
        companyName: data.company,
        designation: data.designation,
        address: data.address,
        batch: data.batch,
        department: data.department,
        bloodGroup: data.bloodGroup
      }

      fetch('http://localhost:5000/members', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      .then(res => res.json())
      .then(result =>{
        console.log(result)
      })

      await updateUser(userInfo);
      setIsLoading(false);
      setUser(user);
      navigate(from, { replace: true });
      window.location.reload();
    } 
    catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Signup now!</h1>
      <p className="py-6">Already have an account? Please <Link to='/login' className='text-blue-700 link link-hover'>Log in</Link></p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
      <form onSubmit={handleSubmit(handleSignUp)}>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input type='name' {...register("name")} placeholder="Full Name" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <input type='email' {...register("email")} placeholder="Email ID" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type='password' {...register("password")} placeholder="Password" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Mobile Number</span>
          </label>
          <input type='number' {...register("number")} placeholder="Mobile No" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Photo</span>
          </label>
          <input type='file' {...register("image")} placeholder="Submit a photo" accept="image/*" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input type='text' {...register("company")} placeholder="Company Name" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Designation</span>
          </label>
          <input type='text' {...register("designation")} placeholder="Name of your designation" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Present Address</span>
          </label>
          <textarea {...register("address")} className="textarea textarea-bordered" placeholder="Present Address"></textarea>
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Your Batch</span>
          </label>
          <select {...register("batch")} className="select select-bordered w-full max-w-xs">
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
          <select {...register("department")} className="select select-bordered w-full max-w-xs">
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
          <select {...register("bloodGroup")} className="select select-bordered w-full max-w-xs">
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
        
        <div className="form-control mt-6">
        <button className={`btn btn-primary ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
        {isLoading ? (
          <span>
            <AiOutlineLoading className="animate-spin" /> Loading...
          </span>
        ) : (
          'Signup'
        )}
      </button>
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
    );
};

export default Signup;
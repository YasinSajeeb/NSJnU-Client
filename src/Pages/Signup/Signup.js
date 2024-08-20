import React, { useContext, useState } from "react";
import "./Signup.css";
import districts from "../../assets/districts.json";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import {
  AiOutlineLoading,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
} from "react-icons/ai";
import { IoPersonSharp } from "react-icons/io5";
import signupAnimation from "../../assets/Signup Animation/signupAnimation.json";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useToken from "../../hooks/useToken";
import signupBackImg from "../../assets/Signup_Background.jpg";
import Lottie from "lottie-react";

const Signup = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [selectedCareer, setSelectedCareer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleCareerChange = (e) => {
    setSelectedCareer(e.target.value);
  };

  if (token) {
    navigate(from, { replace: true });
  }

  const handleSignUp = async (data) => {
    console.log(data);
    setIsLoading(true);

    const image = data.image[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("folder", "Members");
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
        uid: user.uid,
        displayName: data.name,
        email: data.email,
        mobileNumber: data.number,
        photoURL: imageData.secure_url,
        companyName: data.company,
        designation: data.designation,
        internship1: data.internship1,
        internship2: data.internship2,
        presentAddressStreet: data.presentAddressStreet,
        presentAddressThana: data.presentAddressThana,
        presentAddressPostCode: data.presentAddressPostCode,
        presentAddressDistrict: data.presentAddressDistrict,
        permanentAddressStreet: data.permanentAddressStreet,
        permanentAddressThana: data.permanentAddressThana,
        permanentAddressPostCode: data.permanentAddressPostCode,
        permanentAddressDistrict: data.permanentAddressDistrict,
        batch: data.batch,
        department: data.department,
        bloodGroup: data.bloodGroup,
      };

      fetch("https://nsjnu-server.vercel.app/members", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });

      await updateUser(userInfo);
      setUser(user);
      setCreatedUserEmail(userInfo.email);
      setIsLoading(false);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const presentAddressStreet = watch("presentAddressStreet");
  const presentAddressThana = watch("presentAddressThana");
  const presentAddressPostCode = watch("presentAddressPostCode");
  const presentAddressDistrict = watch("presentAddressDistrict");

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setValue("permanentAddressStreet", presentAddressStreet);
      setValue("permanentAddressThana", presentAddressThana);
      setValue("permanentAddressPostCode", presentAddressPostCode);
      setValue("permanentAddressDistrict", presentAddressDistrict);
    } else {
      setValue("permanentAddressStreet", "");
      setValue("permanentAddressThana", "");
      setValue("permanentAddressPostCode", "");
      setValue("permanentAddressDistrict", "");
    }
  };

  const watchedValues = watch([
    "name",
    "email",
    "password",
    "number",
    "image",
    // "presentAddressStreet",
    // "presentAddressDistrict",
    // "permanentAddressStreet",
    // "permanentAddressDistrict",
    // "batch",
    // "department",
    // "bloodGroup",
  ]);
  const isNextButtonEnabled = watchedValues.every(
    (value) => value && value.length > 0
  );

  return (
    <div
      className="hero min-h-screen bg-scroll"
      style={{
        backgroundImage: `url(${signupBackImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content flex-col lg:flex-row lg:w-3/4 mx-auto">
        <div className="text-center lg:text-left">
          {/* <h1 className="text-5xl font-bold">Signup now!</h1> */}\
          <Lottie animationData={signupAnimation} className="w-3/4" />
          <p className="py-6 text-white">
            Already have an account? Please{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold link link-hover"
            >
              Log in
            </Link>
          </p>
        </div>
        <div className="card glass flex-shrink-0 w-full max-w-md shadow-2xl">
          <div className="card-body">
            {step === 1 && (
              <form onSubmit={handleSubmit(handleNextStep)}>
                <h4 className="text-3xl font-extrabold text-center text-white">
                  Sign Up
                </h4>
                <hr
                  className="border-t-2 border-dashed my-4 border-white"
                  // style={{ borderColor: "#052e16" }}
                />
                <div className="form-control mb-2">
                  <div className="relative">
                    <IoPersonSharp className="absolute left-3 top-4 text-lg text-gray-500" />
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="Full Name"
                      className="input input-bordered bg-green-200 pl-10 w-full max-w-md"
                    />
                  </div>
                </div>

                <div className="form-control mb-2">
                  <div className="relative">
                    <AiOutlineMail className="absolute left-3 top-4 text-lg text-gray-500" />
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Email ID"
                      className="input input-bordered bg-green-200 pl-10 w-full max-w-md"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <div className="relative">
                    <AiOutlineLock className="absolute left-3 top-4 text-lg text-gray-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="Password"
                      className="input input-bordered bg-green-200 pl-10 w-full max-w-md"
                    />
                    <button
                      type="button"
                      onClick={handleTogglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Mobile Number</span>
                  </label>
                  <PhoneInput
                    country={"bd"}
                    enableSearch={true}
                    inputStyle={{
                      backgroundColor: "rgb(187 247 208)",
                      width: "100%",
                    }}
                    onChange={(phone) => setValue("number", phone)} // Set the value using setValue
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Your Photo</span>
                  </label>
                  <input
                    type="file"
                    {...register("image")}
                    accept="image/*"
                    className="file-input file-input-bordered w-full max-w-md"
                  />
                </div>
                <div className="form-control">
                  <button
                    type="submit"
                    className={`btn btn-primary text-white mt-4 ${
                      isNextButtonEnabled
                        ? ""
                        : "btn-disabled cursor-not-allowed	"
                    }`}
                    disabled={!isNextButtonEnabled}
                    style={{
                      backgroundColor: isNextButtonEnabled
                        ? "#007bff"
                        : "rgba(255, 255, 255, 0.5)", // adjust the disabled color
                      color: isNextButtonEnabled ? "#fff" : "#007bff", // adjust text color for visibility
                      borderColor: isNextButtonEnabled ? "#007bff" : "#007bff", // optional, for consistent border color
                    }}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit(handleNextStep)}>
                <h4 className="text-lg font-bold text-white my-4">
                  Present Address
                </h4>
                <div className="form-control">
                  <textarea
                    {...register("presentAddressStreet")}
                    className="textarea textarea-bordered w-full bg-green-200 mb-4"
                    placeholder="House no/village, Road etc."
                  ></textarea>
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    {...register("presentAddressThana")}
                    className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                    placeholder="Thana/Upazilla"
                  ></input>
                </div>
                <div className="form-control md:grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      {...register("presentAddressPostCode")}
                      className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                      placeholder="Post code"
                    ></input>
                  </div>
                  <div className="form-control">
                    <select
                      {...register("presentAddressDistrict")}
                      className="select select-bordered w-full max-w-md bg-green-200 mb-4"
                    >
                      <option disabled selected value="">
                        Select District
                      </option>
                      {districts.map((district, index) => (
                        <option key={index} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white mt-4">
                  Permanent Address
                </h4>
                <div className="md:col-span-2">
                  <label className="label cursor-pointer w-52">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-info"
                      onChange={handleCheckboxChange}
                    />
                    <span className="label-text ml-1 text-white font-medium">
                      Same as Present Address
                    </span>
                  </label>
                </div>
                <div className="form-control">
                  <textarea
                    {...register("permanentAddressStreet")}
                    className="textarea textarea-bordered w-full bg-green-200 mb-4"
                    placeholder="House no/village, Road etc."
                  ></textarea>
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    {...register("permanentAddressThana")}
                    className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                    placeholder="Thana/Upazilla"
                  ></input>
                </div>
                <div className="form-control md:grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      {...register("permanentAddressPostCode")}
                      className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                      placeholder="Post code"
                    ></input>
                  </div>
                  <div className="form-control">
                    <select
                      {...register("permanentAddressDistrict")}
                      className="select select-bordered w-full max-w-md bg-green-200 mb-4"
                    >
                      <option disabled selected value="">
                        Select District
                      </option>
                      {districts.map((district, index) => (
                        <option key={index} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-control inline-block w-full">
                  <button
                    type="button"
                    className="btn btn-accent w-20 float-left"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-primary w-20 float-right ${
                      isNextButtonEnabled ? "" : "btn-disabled"
                    }`}
                    disabled={!isNextButtonEnabled}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit(handleNextStep)}>
                <div className="form-control md:grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <select
                      {...register("batch")}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option disabled selected>
                        University Batch No.
                      </option>
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

                  <div>
                    <select
                      {...register("department")}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option disabled selected>
                        Your Department
                      </option>
                      <option value="Bangla">Bangla</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Philosophy">Philosophy</option>
                      <option value="Islamic History & Culture">
                        Islamic History & Culture
                      </option>
                      <option value="Islamic Studies">Islamic Studies</option>
                      <option value="Music">Music</option>
                      <option value="Theatre">Theatre</option>
                      <option value="Fine Arts">Fine Arts</option>
                      <option value="Physics">Physics</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Statistics">Statistics</option>
                      <option value="Computer Science & Engineering">
                        Computer Science & Engineering
                      </option>
                      <option value="Economics">Economics</option>
                      <option value="Political Science">
                        Political Science
                      </option>
                      <option value="Sociology">Sociology</option>
                      <option value="Social Work">Social Work</option>
                      <option value="Anthropology">Anthropology</option>
                      <option value="Mass Communication & Journalism">
                        Mass Communication & Journalism
                      </option>
                      <option value="Public Administration">
                        Public Administration
                      </option>
                      <option value="Film & Television">
                        Film & Television
                      </option>
                      <option value="Accounting & Information Systems">
                        Accounting & Information Systems
                      </option>
                      <option value="Management Studies">
                        Management Studies
                      </option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Law">Law</option>
                      <option value="Land Management & Law">
                        Land Management & Law
                      </option>
                      <option value="Geography & Environment">
                        Geography & Environment
                      </option>
                      <option value="Botany">Botany</option>
                      <option value="Zoology">Zoology</option>
                      <option value="Psychology">Psychology</option>
                      <option value="Pharmacy">Pharmacy</option>
                      <option value="Microbiology">Microbiology</option>
                      <option value="Biochemistry & Molecular Biology">
                        Biochemistry & Molecular Biology
                      </option>
                      <option value="Genetic Engineering & Biotechnology">
                        Genetic Engineering & Biotechnology
                      </option>
                      <option value="Institute of Modern Language">
                        Institute of Modern Language
                      </option>
                      <option value="Institute of Education & Research">
                        Institute of Education & Research
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <select
                    {...register("bloodGroup")}
                    className="select select-bordered w-full max-w-md mb-4"
                  >
                    <option disabled selected>
                      Blood Group
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="form-control">
                  <select
                    {...register("career")}
                    className="select select-bordered w-full max-w-md mb-4"
                    onChange={handleCareerChange}
                  >
                    <option disabled selected>
                      Career
                    </option>
                    <option value="Student">Student</option>
                    <option value="Business">Business</option>
                    <option value="Job">Job</option>
                    <option value="Freelancing">Freelancing</option>
                    <option value="Others">others</option>
                  </select>
                </div>

                {/* Business fields */}
                {selectedCareer === "Business" && (
                  <>
                    <div className="form-control">
                      <input
                        type="text"
                        {...register("businessName")}
                        className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                        placeholder="Name of Your Business"
                      ></input>
                    </div>
                    <div className="form-control">
                      <input
                        type="text"
                        {...register("businessType")}
                        className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                        placeholder="Type of Your Business"
                      ></input>
                    </div>
                  </>
                )}

                {/* Job fields */}
                {selectedCareer === "Job" && (
                  <>
                    <div className="form-control">
                      <input
                        type="text"
                        {...register("jobInstituition")}
                        className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                        placeholder="Name of the Company you are working"
                      ></input>
                    </div>
                    <div className="form-control">
                      <input
                        type="text"
                        {...register("designation")}
                        className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                        placeholder="Your Designation"
                      ></input>
                    </div>
                  </>
                )}

                {/* Freelancing fields */}
                {selectedCareer === "Freelancing" && (
                  <div className="form-control">
                    <input
                      type="text"
                      {...register("freelancingSector")}
                      className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                      placeholder="Your Freelancing Sector"
                    ></input>
                  </div>
                )}
                {/* Other fields */}
                {selectedCareer === "Others" && (
                  <div className="form-control">
                    <input
                      type="text"
                      {...register("others")}
                      className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                      placeholder="Define"
                    ></input>
                  </div>
                )}

                <div className="form-control mt-6 inline-block w-full">
                  <button
                    type="button"
                    className="btn btn-accent w-20 float-left"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-primary w-20 float-right ${
                      isNextButtonEnabled ? "" : "btn-disabled"
                    }`}
                    disabled={!isNextButtonEnabled}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
            {step === 4 && (
              <form onSubmit={handleSubmit(handleSignUp)}>
                <div className="form-control">
                  <input
                    type="text"
                    {...register("facebookLink")}
                    className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                    placeholder="Your Facebook Profile Link"
                  ></input>
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    {...register("instagramLink")}
                    className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                    placeholder="Your Instagram Profile Link"
                  ></input>
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    {...register("linkedInLink")}
                    className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                    placeholder="Your LinkedIn Profile Link"
                  ></input>
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    {...register("tiktokLink")}
                    className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                    placeholder="Your Tiktok Profile Link"
                  ></input>
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    {...register("youtubeLink")}
                    className="input input-bordered w-full max-w-md bg-green-200 mb-4"
                    placeholder="Your Youtube Channel Link"
                  ></input>
                </div>

                <div className="form-control mt-6 inline-block w-full">
                  <button
                    type="button"
                    className="btn btn-accent w-20 float-left"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-primary w-30 float-right ${
                      isNextButtonEnabled ? "" : "btn-disabled"
                    }`}
                    disabled={!isNextButtonEnabled}
                  >
                    {isLoading ? (
                      <AiOutlineLoading className="loading-icon" />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

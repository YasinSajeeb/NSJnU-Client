import React, { useContext, useState } from 'react';
import signupBackImg from "../../assets/Signup_Background.jpg";
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import useToken from '../../hooks/useToken';
import Lottie from 'lottie-react';
import loginAnimation from "../../assets/Login Animation/loginAnimation.json";

const auth = getAuth(app);

const Login = () => {

  const { register, handleSubmit, watch } = useForm();
  const {signIn} = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const [token] = useToken(loginUserEmail);
  const [userEmail, setUserEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  if (token) {
    navigate(from, { replace: true });
}

  const handleLogin = data =>{
    console.log(data);
    setLoginError('');
    signIn(data.email, data.password)
    .then(result =>{
      const user = result.user;
      console.log(user);
      setLoginUserEmail(data.email);
      window.location.href = '/';
    })
    .catch(error => {
      console.log(error.message)
      setLoginError(error.message);
    });
  }


  const handleEmailBlur = () => {
    const email = watch('email');
    setUserEmail(email);
    console.log(email);
  };

  const handleForgetPassword = () =>{
    if(!userEmail){
      alert('Please input your email to get password reset mail')
      return;
    }
    sendPasswordResetEmail(auth, userEmail)
    .then( () =>{
      alert('Password Reset Mail Sent')
    })
    .catch( error =>{
      console.error(error)
    })
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    return (
       
        <div className="hero min-h-screen bg-base-200" style={{
          backgroundImage: `url(${signupBackImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
  <div className="hero-content flex-col lg:flex-row-reverse lg:w-3/4 mx-auto">
    <div className="text-center lg:text-left">
    <Lottie animationData={loginAnimation} className="w-2/4" />
    </div>
    <div className="card glass flex-shrink-0 w-full max-w-md shadow-2xl">
      <div className="card-body">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type='email' {...register("email", { onBlur: handleEmailBlur })} placeholder="Email" className="input input-bordered w-full max-w-md" />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Password"
                    className="input input-bordered w-full max-w-md pr-10"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-2 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
          <Link onClick={handleForgetPassword} className='text-xs text-blue-600	underline underline-offset-4'>Forgot Password?</Link>
        </div>
        
        <div className="form-control mt-6">
          <button className="btn text-white" style={{backgroundColor: "#052e16"}}>Login</button>
          <div>
            { loginError && <p className='text-red-600'>{loginError}</p>}
          </div>
        </div>
        </form>
        <p className="py-3 text-center text-white">New to our club?<br/><Link to='/signup' className='text-blue-500 font-semibold link link-hover'>Create new account</Link></p>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;
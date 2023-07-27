import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {

  const { register, handleSubmit } = useForm();
  const {signIn} = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');

  const handleLogin = data =>{
    console.log(data);
    setLoginError('');
    signIn(data.email, data.password)
    .then(result =>{
      const user = result.user;
      console.log(user)
    })
    .catch(error => {
      console.log(error.message)
      setLoginError(error.message);
    });
  }

    return (
       
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">New to our club?<br/><Link to='/signup' className='text-blue-700 link link-hover'>Create new account</Link></p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type='email' {...register("email")} placeholder="Email" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type='password' {...register("password")} placeholder="Password" className="input input-bordered w-full max-w-xs" />
        </div>
        
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
          <div>
            { loginError && <p className='text-red-600'>{loginError}</p>}
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;
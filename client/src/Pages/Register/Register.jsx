import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import Lottie from 'lottie-react';
import registerAnimation from '../../assets/Animations/Register.json';
import { AuthContext } from '../../Providers/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { createUser, updatedUser, setUser, signInWithGoogle } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = location.state?.from || '/';

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const user = { name, photo, email, password };

    // Password Validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('Password must be at least 6 characters, include an uppercase letter, a number, and a special character.');
      return;
    }

    setErrorMessage('');

    createUser(email, password)
      .then((result) => {
        const registeredUser = result.user;
        form.reset();

        updatedUser({
          displayName: user.name,
          photoURL: user.photo
        }).then(() => {
          const updatedData = { ...registeredUser, displayName: user.name, photoURL: user.photo };
          setUser(updatedData);

         axios.post(`${import.meta.env.VITE_API_URL}/users`, user)
            .then(response => {
              if (response.data.insertedId) {
                Swal.fire({
                  title: "Account Created Successfully!",
                  icon: "success",
                  draggable: true
                });
              }
              navigate(redirectPath);
            })
            .catch(error => {
              console.error('Error saving user:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };

  const handleRegisterWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);

       axios.post(`${import.meta.env.VITE_API_URL}/users`, {
          name: loggedUser.displayName,
          photo: loggedUser.photoURL,
          email: loggedUser.email
        })
        .then(response => {
          if (response.data.insertedId) {
            Swal.fire({
              title: "Account Created Successfully!",
              icon: "success",
              draggable: true
            });
          }
          navigate(redirectPath);
        })
        .catch(error => {
          console.error('Error saving user:', error);
        });
      })
      .catch((error) => {
        console.error('Google registration error:', error);
      });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-6 pt-0 lg:pt-20 pb-0 lg:pb-32">
      <div className="flex flex-col-reverse md:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full border border-gray-200">
        
        {/* Left side - Form */}
        <div className="md:w-1/2 w-full p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
            Hey there! <br />
            Register to get started
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              name='name'
              required
              className="w-full px-4 py-3 border bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Enter your PhotoURL"
              name='photo'
              required
              className="w-full px-4 py-3 border bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Enter your email"
              name='email'
              className="w-full px-4 py-3 border bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                name='password'
                className="w-full px-4 py-3 border bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-4 text-gray-500 cursor-pointer'
              >
                {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
              </button>
            </div>

            {/* Error message if password is invalid */}
            {errorMessage && (
              <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
            )}

            <div className="text-right">
              <a href="#" className="text-sm text-gray-500 hover:underline">
                {/* Forgot Password? */}
              </a>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer py-3 bg-gray-900 text-white rounded-md font-semibold hover:bg-gray-800 transition"
            >
              Register
            </button>
          </form>

          <div className="flex items-center justify-center space-x-2 text-gray-400 mt-5 text-sm">
            <hr className="w-1/4 border-gray-300" />
            <span>Or Login with</span>
            <hr className="w-1/4 border-gray-300" />
          </div>

          <button onClick={handleRegisterWithGoogle} className="btn w-full mt-4 py-6 rounded-md bg-white text-black border border-gray-300 flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50">
            <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Register with Google
          </button>

          <div className='text-center mt-5'>
            <small>Already Have An Account? <Link className='text-violet-500' to='/login'>Login</Link></small>
          </div>
        </div>

        {/* Right side - Animation */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-4 bg-gray-100">
          <Lottie style={{ width: '100%', maxWidth: '350px' }} animationData={registerAnimation} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Register;

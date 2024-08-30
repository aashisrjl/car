import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [state, setState] = useState('login');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dipesh")

    try {
      const response = await axios.post('http://localhost:3000/user/login'  , formData, { withCredentials: true });

      setSuccessMessage(response.data.message);
    localStorage.setItem("carToken",response.data.token);
    console.log(response.data)
      setErrorMessage("");

      setRedirect(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      console.error("Error during login:", error.response?.data || error.message);
      setSuccessMessage("");
    }
  };


  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">{state === 'login' ? 'Sign In' : 'Sign Out'}</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            {state === 'login' ? 'Enter your email, phone number, and password to Sign In.' : 'Enter your details to Sign Up.'}
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            {errorMessage && <Typography variant="small" color="red" className="mb-4">{errorMessage}</Typography>}
            {successMessage && <Typography variant="small" color="green" className="mb-4">{successMessage}</Typography>}

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Your email</Typography>
            <Input
              name="email"
              size="lg"
              placeholder="name@mail.com"
              value={formData.email}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            {state === 'signup' && (
              <>
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Phone number</Typography>
                <Input
                  name="phone"
                  size="lg"
                  placeholder="123-456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
              </>
            )}

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Password</Typography>
            <Input
              name="password"
              type="password"
              size="lg"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>

          <Checkbox
            label={
              <Typography variant="small" color="gray" className="flex items-center justify-start font-medium">
                I agree to the&nbsp;
                <a href="#" className="font-normal text-black transition-colors hover:text-gray-900 underline">
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          <Button type="submit" className="mt-6" fullWidth>
            {state === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            {state === 'login' && (
              <>
                <Checkbox
                  label={
                    <Typography variant="small" color="gray" className="flex items-center justify-start font-medium">
                      Subscribe me to the newsletter
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                />
                <Typography variant="small" className="font-medium text-gray-900">
                  <a href="#">Forgot Password</a>
                </Typography>
              </>
            )}
          </div>

          <div className="space-y-4 mt-8">
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* SVG paths for Google icon */}
              </svg>
              <span>Sign in With Google</span>
            </Button>
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
              <span>Sign in With Twitter</span>
            </Button>
          </div>
          
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            {state === 'login' ? 'Not registered?' : 'Already have an account?'}
            <Link to="#" onClick={() => setState(state === 'login' ? 'signup' : 'login')} className="text-gray-900 ml-1">
              {state === 'login' ? 'Create account' : 'Login here'}
            </Link>
          </Typography>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />
      </div>
    </section>
  );
}

export default SignIn;

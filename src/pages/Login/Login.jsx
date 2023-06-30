import { useState } from "react";
import signUpImg from "../../assets/signup.jpg";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const { login, loading, setLoading } = useAuth();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(); //form submit using react-hook

  //loading
  if (loading) {
    return <Loader />;
  }
  const onSubmit = (data) => {
    console.log(data);
    login(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
        toast.success("Login success");
      })
      .catch(() => {
        setLoading(false);
        toast.error("Please Provide Valid Information");
      });
  };

  const inputClassName = `block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`;

  const labelClassName = `peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`;
  return (
    <div className=" my-20 md:grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <img src={signUpImg} alt="" />
      </div>
      <div className=" border p-4 rounded">
        <div className="px-5">
          <SocialLogin title={"Login with"} />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-100 rounded p-5"
        >
          {/* Email */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className={inputClassName}
              placeholder=" "
            />
            <label htmlFor="email" className={labelClassName}>
              Email
            </label>
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          {/* Password */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
              })}
              type={show ? "text" : "password"}
              id="password"
              className={inputClassName}
              placeholder=" "
            />
            {show ? (
              <FaEye
                onClick={() => setShow(!show)}
                className="absolute top-3 right-5 cursor-pointer text-gray-400"
                size={18}
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShow(!show)}
                className="absolute top-3 right-5 cursor-pointer text-gray-400"
                size={18}
              />
            )}
            <label htmlFor="password" className={labelClassName}>
              Password
            </label>

            {errors.password?.type === "required" && (
              <span className="text-red-500 text-sm block">
                Password is required
              </span>
            )}
          </div>

          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me{" "}
            </label>
          </div>
          <div className="mt-5">
            <button type="submit" className="button-primary">
              Log in now
            </button>
          </div>
          <p className="mt-3 text-sm">
            New here?{" "}
            <Link
              to="/signUp"
              className="text-blue-500 link-hover cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

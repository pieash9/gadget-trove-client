import { useState } from "react";
import signUpImg from "../../assets/signup.jpg";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const { createUser, updateUser, logout } = useAuth();
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [show, setShow] = useState(false);
  const [cShow, setCShow] = useState(false);

  const image_hosting_token = import.meta.env.VITE_IBB_KEY;
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(); //form submit using react-hook

  const onSubmit = (data) => {
    //matching password
    if (data.password !== data.cPassword) {
      return setPasswordMatchError("Password & Confirm Password did not match");
    }
    setPasswordMatchError("");
 
    const formData = new FormData(); //creating formData for upload image
    formData.append("image", data.image[0]); //getting image data
    fetch(image_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          const imgUrl = imgRes.data.display_url;

          const userData = {
            name: data.name,
            email: data.email,
            image: imgUrl,
            createdAt: new Date(),
            role: "user",
          };
          console.log(userData);
          
          //create user using email,password
          createUser(data.email, data.password)
            .then(() => {
              updateUser(data.name, imgUrl).then(() => {
                logout()
                  .then(() => {
                    axios
                      .post(`http://localhost:5000/users/:${data.email}`, {
                        ...userData,
                      })
                      .then((res) => {
                        console.log(res.data);
                        navigate("/login");
                        toast.success("Sign Up Completed. Login Now!");
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch(() => toast.error("Something went wrong"));
              });
            })
            .catch(() => toast.error("Please provide valid information"));
        }
      });
  };

  const inputClassName = `block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`;

  const labelClassName = `peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`;
  return (
    <div className=" my-20 md:grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <img src={signUpImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" border p-4 rounded">
        <h2 className="text-gray-800 font-semibold text-4xl mb-5">Sign Up</h2>
        <div className="bg-base-100 rounded p-5">
          {/* Name */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("name", { required: true })}
              type="name"
              id="name"
              className={inputClassName}
              placeholder=" "
            />

            <label htmlFor="name" className={labelClassName}>
              Full Name
            </label>
            {errors.name && (
              <span className="text-red-500 text-sm">
                Full Name is required
              </span>
            )}
          </div>

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
            <small className="text-gray-800">
              Password should be at least 6 characters long, include minimum one
              special character, capital letter & number.
            </small>
            {errors.password?.type === "required" && (
              <span className="text-red-500 text-sm block">
                Password is required
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">
                Password must be more than 6 characters
              </p>
            )}

            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase, one number and one special
                character.
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("cPassword", { required: true })}
              type={cShow ? "text" : "password"}
              id="cPassword"
              className={inputClassName}
              placeholder=" "
            />
            {cShow ? (
              <FaEye
                onClick={() => setCShow(!cShow)}
                className="absolute top-3 right-5 cursor-pointer text-gray-400"
                size={18}
              />
            ) : (
              <FaEyeSlash
                onClick={() => setCShow(!cShow)}
                className="absolute top-3 right-5 cursor-pointer text-gray-400"
                size={18}
              />
            )}
            <label htmlFor="cPassword" className={labelClassName}>
              Confirm Password
            </label>
            {errors.cPassword && (
              <span className="text-red-500 text-sm">
                Confirm password is required
              </span>
            )}
            {passwordMatchError && (
              <span className="text-red-500 text-sm">
                Password did not Match
              </span>
            )}
          </div>

          {/* Image*/}
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("image", { required: true })}
              type="file"
              id="image"
              className={inputClassName}
              placeholder=" "
              accept="image/*"
              //TODO to make image required
            />
            <label htmlFor="image" className={labelClassName}>
              Choose profile
            </label>
          </div>
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
            <label
              htmlFor="terms"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
            </label>
          </div>
          <div className="mt-5">
            <button type="submit" className="button-primary">
              Sign Up now
            </button>
          </div>
          <p className="mt-3 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 link-hover cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

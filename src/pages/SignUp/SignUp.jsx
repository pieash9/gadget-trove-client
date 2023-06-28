import signUpImg from "../../assets/signup.jpg";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const inputClassName = `block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`;

  const labelClassName = `peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`;
  return (
    <div className=" my-10 md:grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <img src={signUpImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" border p-4 rounded">
        <h2 className="text-gray-800 font-semibold text-4xl mb-5">Sign Up</h2>
        {/* Name */}
        <div className="bg-base-200 rounded p-5">
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
              <span className="text-red-500 text-sm">Full Name is required</span>
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
              {...register("password", { required: true })}
              type="password"
              id="password"
              className={inputClassName}
              placeholder=" "
              required
            />
            <label htmlFor="password" className={labelClassName}>
              Password
            </label>
            {errors.password && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("cPassword", { required: true })}
              type="password"
              id="cPassword"
              className={inputClassName}
              placeholder=" "
            />
            <label htmlFor="cPassword" className={labelClassName}>
              Confirm Password
            </label>
            {errors.cPassword && (
              <span className="text-red-500 text-sm">
                Confirm password is required
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative z-0 w-full mb-6 group">
            <input
            {...register("image", { required: true })}
              type="file"
              id="image"
              className={inputClassName}
              placeholder=" "
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
        </div>
      </form>
    </div>
  );
};

export default SignUp;

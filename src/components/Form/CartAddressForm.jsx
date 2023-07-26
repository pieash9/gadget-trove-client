import { useForm } from "react-hook-form";

import useAuth from "../../hooks/useAuth";

import Loader from "../../components/Loader/Loader";

const CartAddressForm = () => {
  const {  loading } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(); //form submit using react-hook

  if (loading) {
    return <Loader />;
  }
  const onSubmit = (data) => {
    console.log(data);
  };

  const inputClassName = `block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`;

  const labelClassName = `peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`;
  return (
    <div className=" my-10 md:w-1/2 mx-auto">
      <div className=" border p-4 rounded">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-100 rounded p-5"
        >
          {/* Full Name */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              className={inputClassName}
              placeholder=" "
            />
            <label htmlFor="name" className={labelClassName}>
              Full Name<span className="text-red-500">*</span>
            </label>
            {errors.name && (
              <span className="text-red-500 text-sm">
                Full Name is required
              </span>
            )}
          </div>

          {/* Mobile number */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("number", { required: true })}
              type="text"
              id="number"
              className={inputClassName}
              placeholder=" "
            />
            <label htmlFor="number" className={labelClassName}>
              Mobile Number<span className="text-red-500">*</span>
            </label>
            {errors.number && (
              <span className="text-red-500 text-sm">
                Mobile Number is required
              </span>
            )}
          </div>

          {/* Email*/}
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className={inputClassName}
              placeholder=" "
            />
            <label htmlFor="email" className={labelClassName}>
              Email Address<span className="text-red-500">*</span>
            </label>
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          {/* Delivery address*/}
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("deliveryAddress", { required: true })}
              type="text"
              id="deliveryAddress"
              className={inputClassName}
              placeholder=" "
            />
            <label htmlFor="deliveryAddress" className={labelClassName}>
            Delivery address<span className="text-red-500">*</span>
            </label>
            {errors.deliveryAddress && (
              <span className="text-red-500 text-sm">Delivery address is required</span>
            )}
          </div>

          {/* City name*/}
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("cityName", { required: true })}
              type="text"
              id="cityName"
              className={inputClassName}
              placeholder=" "
            />
            <label htmlFor="cityName" className={labelClassName}>
            City name<span className="text-red-500">*</span>
            </label>
            {errors.cityName && (
              <span className="text-red-500 text-sm">City name is required</span>
            )}
          </div>

          {/* District name */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("districtName", { required: true })}
              type="text"
              id="districtName"
              className={inputClassName}
              placeholder=" "
            />
            <label htmlFor="districtName" className={labelClassName}>
            District name<span className="text-red-500">*</span>
            </label>
            {errors.districtName && (
              <span className="text-red-500 text-sm">District name is required</span>
            )}
          </div>

         

          <div className="mt-5">
            <button type="submit" className="button-primary">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartAddressForm;

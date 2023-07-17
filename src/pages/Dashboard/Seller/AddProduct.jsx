import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/Title/SectionTitle";
import useAuth from "../../../hooks/useAuth";

const AddProduct = () => {
  const { user } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(); //form submit using react-hook
  const onSubmit = (data) => {
    console.log(data);
  };

  const inputClassName = `block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`;

  const labelClassName = `peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`;
  return (
    <div>
      <SectionTitle title={"Add A Product"} />

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className=" border p-4 rounded">
          <div className="bg-base-100 rounded p-5">
            {/* Product Name & price*/}
            <div className="md:flex md:gap-10 gap-5">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  {...register("name", { required: true })}
                  type="name"
                  id="name"
                  className={inputClassName}
                  placeholder=" "
                />

                <label htmlFor="name" className={labelClassName}>
                  Product name <span className="text-red-500">*</span>
                </label>
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    Product name is required
                  </span>
                )}
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  {...register("price", { required: true })}
                  type="text"
                  id="price"
                  className={inputClassName}
                  placeholder=" "
                />

                <label htmlFor="price" className={labelClassName}>
                  Price <span className="text-red-500">*</span>
                </label>
                {errors.price && (
                  <span className="text-red-500 text-sm">
                    Price is required
                  </span>
                )}
              </div>
            </div>

            {/* Email & Seller Name*/}
            <div className="md:flex md:gap-10 gap-5">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  id="email"
                  className={inputClassName}
                  defaultValue={user?.email}
                  readOnly
                />
                <label htmlFor="email" className={labelClassName}>
                  Email <span className="text-red-500">*</span>
                </label>
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    Email is required
                  </span>
                )}
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  {...register("sellerName", { required: true })}
                  type="text"
                  id="sellerName"
                  className={inputClassName}
                  defaultValue={user?.displayName}
                  readOnly
                />
                <label htmlFor="sellerName" className={labelClassName}>
                  Seller Name <span className="text-red-500">*</span>
                </label>
                {errors.sellerName && (
                  <span className="text-red-500 text-sm">
                    Seller Name is required
                  </span>
                )}
              </div>
            </div>

            {/* Image & Product Category*/}

            <div className="md:flex md:gap-10 gap-5 items-center">
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
                  Choose Product Image <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group flex border-b-2 pb-1 border-gray-300">
                <select
                  id="category"
                  className="select focus:outline-none border text-gray-700 font-thin border-gray-300 select-sm w-full mt-3 border-b-2"
                  {...register("category", { required: true })}
                >
                  <option value="headphones">Headphones</option>
                  <option value="power banks">Power Banks</option>
                  <option value="laptops">Laptops</option>
                  <option value="speakers">Speakers</option>
                  <option value="ipad">iPad</option>
                  <option value="action camera">Action Camera</option>
                  <option value="smartwatch">Smartwatch</option>
                  <option value="earBuds">EarBuds</option>
                </select>
                <label htmlFor="category" className={labelClassName}>
                  Select Product Category{" "}
                  <span className="text-red-500">*</span>
                </label>
                {errors.category && (
                  <span className="text-red-500 text-sm">
                    Product Category is required
                  </span>
                )}
              </div>
            </div>

            <div className="md:flex md:gap-10 gap-5">
              {/* Available stock & Product Details*/}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  {...register("quantity", { required: true })}
                  type="number"
                  id="quantity"
                  className={inputClassName}
                  placeholder=" "
                />

                <label htmlFor="quantity" className={labelClassName}>
                  Available Product Stock{" "}
                  <span className="text-red-500">*</span>
                </label>
                {errors.quantity && (
                  <span className="text-red-500 text-sm">
                    Available Product Stock is required
                  </span>
                )}
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <textarea
                  {...register("description", { required: true })}
                  type="text"
                  id="description"
                  className={inputClassName}
                  placeholder=" "
                //   todo min length set
                //   minLength={200} //set description word minimum 200 characters
                />

                <label htmlFor="description" className={labelClassName}>
                  Product Description (Minimum:200 characters)
                  <span className="text-red-500">*</span>
                </label>
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    Available Product Stock is required
                  </span>
                )}
              </div>
            </div>

            <div className="mt-5">
              <button type="submit" className="button-primary">
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

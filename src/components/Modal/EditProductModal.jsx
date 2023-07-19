/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const EditProductModal = ({ isOpen, closeModal }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const image_hosting_token = import.meta.env.VITE_IBB_KEY;
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm(); //form submit using react-hook

  const onSubmit = (data) => {
    setLoading(true);
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

          const productData = {
            name: data.productName,
            sellerEmail: data.email,
            sellerName: data.sellerName,
            price: data.price,
            image: imgUrl,
            category: data.category,
            quantity: data.quantity,
            description: data.description,
            createdAt: new Date(),
          };
          console.log(productData);
          axiosSecure
            .post("/products", { ...productData })
            .then((res) => {
              if (res.data.insertedId) {
                setLoading(false);
                reset();
                toast.success("Product added");
              }
            })
            .catch(() => {
              setLoading(false);
              toast.error("Something went wrong");
            });
        }
      });
  };
  //className for input
  const inputClassName = `block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`;

  //className for label
  const labelClassName = `peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`;
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="absolute right-4 top-4">
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </div>

                  <div className="">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      autoComplete="off"
                      className=" border p-4 rounded border-gray-300"
                    >
                      <div className="bg-base-100 rounded p-5">
                        {/* Product Name & price*/}
                        <div className="md:flex md:gap-10 gap-5">
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              {...register("productName", { required: true })}
                              type="name"
                              id="productName"
                              className={inputClassName}
                              placeholder=" "
                            />

                            <label
                              htmlFor="productName"
                              className={labelClassName}
                            >
                              Product name{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            {errors.productName && (
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
                            <label
                              htmlFor="sellerName"
                              className={labelClassName}
                            >
                              Seller Name{" "}
                              <span className="text-red-500">*</span>
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
                              required
                            />
                            <label htmlFor="image" className={labelClassName}>
                              Choose Product Image{" "}
                              <span className="text-red-500">*</span>
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
                              <option value="action camera">
                                Action Camera
                              </option>
                              <option value="smartwatch">Smartwatch</option>
                              <option value="earBuds">EarBuds</option>
                            </select>
                            <label
                              htmlFor="category"
                              className={labelClassName}
                            >
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

                        {/* Available stock & Product Details*/}
                        <div className="md:flex md:gap-10 gap-5">
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              {...register("quantity", { required: true })}
                              type="number"
                              id="quantity"
                              className={inputClassName}
                              placeholder=" "
                            />

                            <label
                              htmlFor="quantity"
                              className={labelClassName}
                            >
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
                              minLength={200} //set description word minimum 200 characters
                            />

                            <label
                              htmlFor="description"
                              className={labelClassName}
                            >
                              Product Description (Minimum:200 characters)
                              <span className="text-red-500">*</span>
                            </label>
                            {errors.description && (
                              <span className="text-red-500 text-sm">
                                Product Description is required
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-2">
                          <button
                            disabled={loading}
                            type="submit"
                            className="button-primary disabled:bg-gray-400 flex items-center"
                          >
                            <span> Add Product</span>
                            {loading && (
                              <span className="loading loading-spinner loading-sm ml-2"></span>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EditProductModal;

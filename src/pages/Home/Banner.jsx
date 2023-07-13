import banner from "../../assets/banner/banner.jpg";

const Banner = () => {
  return (
    <div className="w-full relative">
      <img className="w-full rounded" src={banner} alt="" />
      <div className="absolute top-0 flex flex-col gap-5 justify-center h-full w-full items-center bg-black bg-opacity-50 rounded">
        <h3 className="text-white text-5xl font-semibold">Get Your Best Gadget!</h3>
        <button className="btn rounded-full px-8">Get Started</button>
      </div>
    </div>
  );
};

export default Banner;

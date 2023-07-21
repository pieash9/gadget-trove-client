import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-240px)]">
      <Triangle
        height="80"
        width="80"
        color="#2563EB"
        ariaLabel="triangle-loading"
        wrapperStyle={{ AudioBuffer }}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;

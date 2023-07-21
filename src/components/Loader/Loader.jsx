import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex h-screen justify-center items-center z-50">

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

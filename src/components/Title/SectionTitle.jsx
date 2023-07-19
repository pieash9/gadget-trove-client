/* eslint-disable react/prop-types */
const SectionTitle = ({ title, subtitle }) => {
  return (
    <div>
      <div className="flex items-center">
        <h3 className="text-gray-600 text-xl my-2 font-medium">{title}</h3>
        <hr className="flex-grow ml-4 border-gray-300" />
      </div>
      <p className="text-gray-500 mb-5 text-sm ">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;

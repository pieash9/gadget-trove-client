import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex items-center mb-4 md:mb-0">
            <img className="h-8 w-8 mr-2" src={logo} alt="Logo" />
            <span className="text-white text-lg font-semibold">
              GadgetTrove
            </span>
          </div>

          {/* Address */}
          <div className="md:w-1/3 mt-4 md:mt-0">
            <h3 className="text-white text-lg font-semibold mb-2">
              Contact Us
            </h3>
            <p className="text-gray-400">
              123 Street, City, State, Country
              <br />
              info@example.com
              <br />
              +1 (123) 456-7890
            </p>
          </div>
          {/* Subscribe Mail Option */}
          <div className="md:w-1/3">
            <h3 className="text-white text-lg font-semibold mb-2">
              Subscribe to our Newsletter
            </h3>
            <div className="flex flex-col md:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 rounded-l-md py-2 px-4 mb-2 md:mb-0 md:mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-sky-400 rounded-r-md px-4 py-2 text-white font-semibold hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

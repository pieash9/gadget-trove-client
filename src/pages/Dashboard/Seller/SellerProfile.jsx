import SectionTitle from "../../../components/Title/SectionTitle";
import useAuth from "../../../hooks/useAuth";

const SellerProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <SectionTitle title={"Profile"} />

      <div className="border border-gray-300 rounded">
        <div className="bg-white p-4 rounded shadow-lg">
          <div className="text-center">
            <img
              src={user?.photoURL}
              alt={"sellerImage"}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">{user?.displayName}</h1>
          </div>
          <div className="flex justify-center items-center mt-4">
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Pending Products</div>
                <h3 className="stat-value text-warning text-center">{1}</h3>
              </div>
              <div className="stat">
                <div className="stat-title">Approved Products</div>
                <h3 className="stat-value text-success text-center">{1}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;

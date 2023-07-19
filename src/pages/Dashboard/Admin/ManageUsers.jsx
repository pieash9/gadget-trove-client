import UserCard from "../../../components/Cards/UserCard";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import SectionTitle from "../../../components/Title/SectionTitle";
import useUsersData from "../../../hooks/useUsersData";

const ManageUsers = () => {
  const { allUserData, refetch, isLoading } = useUsersData();
  console.log(allUserData);

  return (
    <div>
      <SectionTitle title={"Manage Users"} />

      {isLoading && <LoadingSpinner />}
      <div className="div grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {allUserData.length > 0 &&
          allUserData.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              refetch={refetch}
              isLoading={isLoading}
            />
          ))}
      </div>
    </div>
  );
};

export default ManageUsers;

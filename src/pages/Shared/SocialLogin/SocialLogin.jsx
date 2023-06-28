/* eslint-disable react/prop-types */
import google from "../../../assets/google.png";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const SocialLogin = ({ title }) => {
  const { signInWithGoogle } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const userData = {
          name: displayName,
          email: email,
          image: photoURL,
          role: "student",
          createdAt: new Date().toLocaleDateString(),
        };
        toast.success("Login success");
        navigate(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex items-center flex-col">
        <div
          onClick={handleGoogleLogin}
          className="flex items-center btn btn-ghost px-5 normal-case"
        >
          <p className="text-lg font-medium">{title}</p>
          <img className=" h-8 w-8 ml-2" src={google} alt="" />
        </div>
      </div>
      <div className="divider">OR</div>
    </>
  );
};

export default SocialLogin;

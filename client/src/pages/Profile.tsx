import { selectUser } from "@/store/slices/userAuthSlice";
import { useSelector } from "react-redux";
import { FaLinkedin } from "react-icons/fa";
import userImage from "../assets/user.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector(selectUser);
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = userImage;
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="px-10 py-6 mx-4 mt-20 bg-white rounded-lg shadow-lg md:mx-auto border-1">
        <h1 className="text-3xl flex justify-center mb-5">My Profile</h1>
        <div className="flex flex-col items-center w-full m-auto sm:flex-row">
          <div className="flex mx-auto sm:mr-10 sm:m-0">
            <div className="items-center justify-center w-20 h-20 m-auto mr-4 sm:w-32 sm:h-32">
              <img
                alt="profile"
                src={user.image}
                onError={handleImageError}
                className="object-cover w-20 h-20 mx-auto rounded-full sm:w-32 sm:h-32"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-4 mx-auto my-auto sm:pt-0 sm:mx-0">
            <div className="flex mx-auto sm:flex-row sm:mx-0 ">
              <h2 className="flex pr-4 text-xl font-light text-gray-900 sm:text-3xl">
                {user.fullName}
              </h2>
            </div>
            <Link
              to={`https://www.linkedin.com/in/${user.username}/`}
              className="flex gap-1"
            >
              <div className="flex items-center">
                <FaLinkedin className="w-4 h-4 text-[#0B67C2]" />
              </div>
              <p className="text-sm font-medium text-gray-800 md:text-base">
                {user.username}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;

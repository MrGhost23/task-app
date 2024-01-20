import { selectUser } from "@/store/slices/userAuthSlice";
import { useSelector } from "react-redux";
import { FaLinkedin } from "react-icons/fa";
import userimage from "../assets/user.png";

const Profile = () => {
  const user = useSelector(selectUser);
  console.log(user);
  const handleImageError = (event) => {
    event.target.src = userimage;
  };
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-screen-md px-10 py-6 mx-4 mt-20 bg-white rounded-lg shadow md:mx-auto border-1">
        <div className="flex flex-col items-start w-full m-auto sm:flex-row">
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
          <div className="flex flex-col pt-4 mx-auto my-auto sm:pt-0 sm:mx-0">
            <div className="flex flex-col mx-auto sm:flex-row sm:mx-0 ">
              <h2 className="flex pr-4 text-xl font-light text-gray-900 sm:text-3xl">
                {user.fullName}
              </h2>
              <div className="flex items-center">
                <FaLinkedin className="w-4 h-4 text-[#0B67C2]" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full pt-5">
          <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">
            {user.fullName}
          </h1>
          <p className="text-sm text-gray-500 md:text-base">{user.bio}</p>
          <p className="text-sm text-gray-800 md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
            quam?
          </p>
        </div>
      </div>
    </div>
  );
};
export default Profile;

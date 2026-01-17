// axios.defaults.withCredentials = true;
const Navbar = ({ user }) => {
  const googleLogin = () => {
    window.open(`${import.meta.env.VITE_URI}/login-with-google`, "_self");
  };

  const logout = () => {
    window.open(`${import.meta.env.VITE_URI}/logout`, "_self");
  };
  return (
    <div className="flex justify-between p-4 bg-gray-200">
      <h2 className="font-bold">My App</h2>

      {user ? (
        <div className="flex items-center gap-3">
          {user.photo && (
            <img
              src={user.photo}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
          )}
          <span>{user?.name?.split(" ")[0]}</span>

          <span className="text-sm text-gray-600">{user?.email}</span>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={googleLogin}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Navbar;

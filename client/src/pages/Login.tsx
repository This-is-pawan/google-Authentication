const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/login-with-google";
  };

  return (
    <div className="w-full border bg-purple-50 max-w-[300px] m-auto mt-10 p-10 rounded-xl shadow-md">
      <h1 className="text-2xl mb-6 text-center font-semibold text-purple-700">
        Google Login
      </h1>

      <div className="flex justify-center">
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

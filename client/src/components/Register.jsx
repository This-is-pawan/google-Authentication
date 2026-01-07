const Register = ({ user }) => {
  return (
    <div className="p-4">
      {user ? (
        <h2>Welcome, {user.displayName}</h2>
      ) : (
        <h2>Please login with Google</h2>
      )}
    </div>
  );
};

export default Register;

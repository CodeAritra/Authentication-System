export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="card p-6 w-full max-w-md" >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          className="input input-bordered w-full mb-2"
          
          placeholder="Name"
        />
        <input
          className="input input-bordered w-full mb-2"
          
          placeholder="Email"
        />
        <input
          className="input input-bordered w-full mb-4"
          type="password"
          placeholder="Password"
        />
        <button className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
}

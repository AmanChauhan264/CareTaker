import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="flex justify-between items-center px-10 py-5 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">
          CARETAKER
        </h1>

       <div className="flex gap-6 items-center">
  <Link
    to="/login"
    className="text-slate-700 hover:text-blue-600"
  >
    Login
  </Link>

  <Link
    to="/register"
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    Get Started
  </Link>
</div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center mt-40 px-4">
        <h1 className="text-6xl font-bold">
          Your Personal Digital Guardian
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl">
          Manage daily tasks, future events, reminders, and important moments
          in one place.
        </p>

        <Link
  to="/register"
  className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg inline-block"
>
  Start Managing Today
</Link>
      </section>
    </div>
  );
}

export default Landing;
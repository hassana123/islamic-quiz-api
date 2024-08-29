// src/components/Navbar.js
import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-2xl font-bold">API App</NavLink>
        <div>
          <NavLink to="/documentation" className="text-white mx-2">Documentation</NavLink>
          <NavLink to="/feedback" className="text-white mx-2">Feedback</NavLink>
          <NavLink to="/add-question" className="text-white mx-2">Add Question</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

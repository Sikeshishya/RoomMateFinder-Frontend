import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">RoommateHub</h2>
            <p className="text-gray-600 mb-4">
              Finding your perfect roommate match has never been easier.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-roommate-600 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-600 hover:text-roommate-600 transition-colors duration-200">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-roommate-600 transition-colors duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-roommate-600 transition-colors duration-200">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-4">Contact</h3>
            <p className="text-gray-600 mb-2">Email: support@roommatehub.com</p>
            <p className="text-gray-600 mb-2">Phone: (123) 456-7890</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} RoommateHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
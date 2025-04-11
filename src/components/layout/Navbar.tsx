import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold text-roommate-600">RoommateHub</h1>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-roommate-600 font-medium">
              Home
            </Link>
            <Link to="/properties" className="text-gray-700 hover:text-roommate-600 font-medium">
              Properties
            </Link>
            {isAuthenticated() ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-roommate-600 font-medium">
                  Dashboard
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1 px-2 py-1">
                      <User size={18} className="mr-1" />
                      {user?.username || 'Account'}
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="z-50 w-56">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/my-properties')}>
                      My Properties
                    </DropdownMenuItem>
                    {user?.role === 'ADMIN' && (
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        Admin Panel
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Register
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="p-1">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-roommate-600 font-medium py-2" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/properties" className="text-gray-700 hover:text-roommate-600 font-medium py-2" onClick={toggleMenu}>
                Properties
              </Link>
              {isAuthenticated() ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-roommate-600 font-medium py-2" onClick={toggleMenu}>
                    Dashboard
                  </Link>
                  <Link to="/profile" className="text-gray-700 hover:text-roommate-600 font-medium py-2" onClick={toggleMenu}>
                    Profile
                  </Link>
                  <Link to="/my-properties" className="text-gray-700 hover:text-roommate-600 font-medium py-2" onClick={toggleMenu}>
                    My Properties
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <Link to="/admin" className="text-gray-700 hover:text-roommate-600 font-medium py-2" onClick={toggleMenu}>
                      Admin Panel
                    </Link>
                  )}
                  <Button variant="ghost" onClick={handleLogout} className="justify-start px-0">
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" onClick={() => { navigate('/login'); toggleMenu(); }} className="w-full">
                    Login
                  </Button>
                  <Button onClick={() => { navigate('/register'); toggleMenu(); }} className="w-full">
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center">
          <span className="text-eco-600 font-display font-bold text-2xl">Eco<span className="text-sky-600">Fix</span></span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="/how-it-works" className="text-foreground hover:text-eco-600 transition-colors">
            How It Works
          </a>
          <a href="/trades" className="text-foreground hover:text-eco-600 transition-colors">
            Find Trades
          </a>
          <a href="/join" className="text-foreground hover:text-eco-600 transition-colors">
            Become a Provider
          </a>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button asChild>
              <a href="/register">Sign Up</a>
            </Button>
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden container mx-auto px-4 pb-4">
          <div className="flex flex-col gap-4">
            <a 
              href="/how-it-works" 
              className="text-foreground hover:text-eco-600 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="/trades" 
              className="text-foreground hover:text-eco-600 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Find Trades
            </a>
            <a 
              href="/join" 
              className="text-foreground hover:text-eco-600 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Become a Provider
            </a>
            <div className="flex flex-col gap-3">
              <Button variant="outline" asChild>
                <a href="/login" onClick={() => setIsOpen(false)}>Login</a>
              </Button>
              <Button asChild>
                <a href="/register" onClick={() => setIsOpen(false)}>Sign Up</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

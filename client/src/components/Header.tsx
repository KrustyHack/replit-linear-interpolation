import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="material-icons text-primary text-2xl">calculate</span>
          <Link href="/" className="text-xl font-semibold text-primary hover:text-primary/90">
            Linear Interpolation
          </Link>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link 
                href="/" 
                className="flex items-center text-gray-700 hover:text-primary transition-colors"
              >
                <span className="material-icons mr-1 text-sm">home</span>
                Calculator
              </Link>
            </li>
            <li>
              <Link 
                href="/tutorial" 
                className="flex items-center text-gray-700 hover:text-primary transition-colors"
              >
                <span className="material-icons mr-1 text-sm">menu_book</span>
                Tutorial
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 
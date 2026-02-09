import { useNavigate, useLocation, Link } from "react-router-dom";
import { Dropdown } from "@vayuko/ui";
import { COMPONENTS, GETTING_STARTED } from "../lib/components";

const navOptions = COMPONENTS.map(({ path, label }) => ({ value: path, label }));

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname || "/";

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-[#E5E7EB] bg-white/95 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="menu-btn-sidebar flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          aria-label="Open component list"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link
          to="/demos"
          className="flex items-center gap-2 font-semibold text-gray-800 no-underline transition-opacity hover:opacity-90"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-sm">
            V
          </span>
          <span>@vayuko/ui</span>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to={GETTING_STARTED.path}
          className="text-sm font-medium text-gray-600 no-underline transition-colors hover:text-gray-900"
        >
          Getting started
        </Link>
        <div className="w-52">
          <Dropdown
            options={navOptions}
            value={currentPath}
            onChange={(path) => navigate(path)}
            placeholder="Jump to component…"
            searchable
            aria-label="Navigate to component"
          />
        </div>
      </div>
    </header>
  );
}

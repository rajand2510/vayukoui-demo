import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { COMPONENTS, GETTING_STARTED, DEMOS_BASE } from "./lib/components";

const iconClass = "h-5 w-5 flex-shrink-0";

function IconHome() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}
function IconPalette() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4m0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  );
}
function IconCursorClick() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  );
}
function IconSlider() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  );
}
function IconSwitchHorizontal() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  );
}
function IconChevronDown() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
function IconCalendarRange() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
function IconRadio() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconMicrophone() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v3m0 0v-3a7 7 0 0114 0v3m-3.5 0h-9" />
    </svg>
  );
}
function IconBell() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-6-6 6 6 0 00-6 6v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}
function IconCube() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
function IconChartBar() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

const SIDEBAR_VISIBLE_MIN = 640;

export default function Layout() {
  const location = useLocation();
  const currentPath = location.pathname || "/";
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${SIDEBAR_VISIBLE_MIN - 1}px)`);
    setIsSmallScreen(mql.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches);
      if (e.matches === false) setLeftPanelOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setLeftPanelOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!leftPanelOpen || !isSmallScreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [leftPanelOpen, isSmallScreen]);

  const showMobileDrawer = leftPanelOpen && isSmallScreen;

  const getIcon = (path: string, slug: string) => {
    if (path === DEMOS_BASE) return <IconHome />;
    switch (slug) {
      case "getting-started": return <IconBook />;
      case "theme-provider": return <IconPalette />;
      case "button": return <IconCursorClick />;
      case "slider": return <IconSlider />;
      case "range-slider": return <IconSwitchHorizontal />;
      case "dropdown": return <IconChevronDown />;
      case "date-picker": return <IconCalendar />;
      case "date-range-picker": return <IconCalendarRange />;
      case "radio-group": return <IconRadio />;
      case "voice-recorder": return <IconMicrophone />;
      case "notification": return <IconBell />;
      case "progress": return <IconChartBar />;
      case "tabs": return <IconCube />;
      case "modal": return <IconCube />;
      case "drawer": return <IconCube />;
      case "accordion": return <IconCube />;
      default: return <IconCube />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F6F8]">
      <Navbar onMenuClick={() => setLeftPanelOpen((o) => !o)} />
      <div className="flex flex-1 min-h-0">
        <aside
          className="sidebar-icon w-16 shrink-0 flex-col items-center border-r border-[#E5E7EB] bg-white py-4"
          aria-label="Icon navigation"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                isActive ? "bg-indigo-50 text-indigo-600" : ""
              }`
            }
            aria-label="Overview"
          >
            <IconHome />
          </NavLink>
          {COMPONENTS.filter((c) => c.path !== DEMOS_BASE).map(({ path, slug }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                  isActive ? "bg-indigo-50 text-indigo-600" : ""
                }`
              }
              aria-label={COMPONENTS.find((c) => c.path === path)?.label ?? path}
            >
              {getIcon(path, slug)}
            </NavLink>
          ))}
        </aside>

        {/* Sidebar: in-flow, hidden only on small screens (see index.css) */}
        <aside
          className="sidebar-list w-[340px] shrink-0 flex-col border-r border-[#E5E7EB] bg-white"
          aria-label="Component list"
        >
          <div className="shrink-0 border-b border-[#E5E7EB] px-4 py-3">
            <span className="text-sm font-semibold text-gray-700">Navigation</span>
          </div>
          <nav className="sidebar-list-nav p-3">
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Docs</p>
            <ul className="mb-4 space-y-2">
              <li>
                <NavLink
                  to={GETTING_STARTED.path}
                  className={({ isActive }) =>
                    `block rounded-2xl border-l-4 border-indigo-500 bg-indigo-50/50 p-4 text-left no-underline shadow-sm transition-all duration-200 hover:bg-indigo-50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                      isActive ? "border-indigo-600 bg-indigo-100/70 shadow-md" : "border-indigo-400"
                    }`
                  }
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold text-gray-900">{GETTING_STARTED.label}</div>
                      <div className="mt-0.5 truncate text-xs text-gray-600">{GETTING_STARTED.subtitle}</div>
                    </div>
                    <span className={currentPath === GETTING_STARTED.path ? "badge-active" : "badge-pending"}>
                      {currentPath === GETTING_STARTED.path ? "Active" : "Start here"}
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Components</p>
            <ul className="space-y-2">
              {COMPONENTS.filter((c) => c.path !== GETTING_STARTED.path).map(({ path, label, subtitle }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `block rounded-2xl border border-[#E5E7EB] bg-white p-4 text-left no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                        isActive ? "border-indigo-200 bg-indigo-50/50 shadow-md" : ""
                      }`
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium text-gray-900">{label}</div>
                        {subtitle && <div className="mt-0.5 truncate text-xs text-gray-500">{subtitle}</div>}
                      </div>
                      <span className={path === currentPath ? "badge-active" : "badge-completed"}>
                        {path === currentPath ? "Active" : "Component"}
                      </span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile only: overlay + drawer (never on big screen) */}
        {showMobileDrawer && (
          <>
            <button
              type="button"
              onClick={() => setLeftPanelOpen(false)}
              className="fixed inset-0 top-14 z-20 bg-black/40"
              aria-label="Close overlay"
            />
            <aside
              className="fixed left-0 top-14 z-30 flex h-[calc(100vh-3.5rem)] w-[340px] max-w-[85vw] flex-col overflow-hidden border-r border-[#E5E7EB] bg-white shadow-xl"
              aria-label="Component list"
            >
              <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3">
                <span className="text-sm font-semibold text-gray-700">Navigation</span>
                <button
                  type="button"
                  onClick={() => setLeftPanelOpen(false)}
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Close panel"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="sidebar-list-nav flex-1 p-3 min-h-0">
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Docs</p>
                <ul className="mb-4 space-y-2">
                  <li>
                    <NavLink
                      to={GETTING_STARTED.path}
                      onClick={() => setLeftPanelOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-2xl border-l-4 border-indigo-500 bg-indigo-50/50 p-4 text-left no-underline shadow-sm transition-all duration-200 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                          isActive ? "border-indigo-600 bg-indigo-100/70 shadow-md" : "border-indigo-400"
                        }`
                      }
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-semibold text-gray-900">{GETTING_STARTED.label}</div>
                          <div className="mt-0.5 truncate text-xs text-gray-600">{GETTING_STARTED.subtitle}</div>
                        </div>
                        <span className={currentPath === GETTING_STARTED.path ? "badge-active" : "badge-pending"}>
                          {currentPath === GETTING_STARTED.path ? "Active" : "Start here"}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Components</p>
                <ul className="space-y-2">
                  {COMPONENTS.filter((c) => c.path !== GETTING_STARTED.path).map(({ path, label, subtitle }) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        onClick={() => setLeftPanelOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-2xl border border-[#E5E7EB] bg-white p-4 text-left no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                            isActive ? "border-indigo-200 bg-indigo-50/50 shadow-md" : ""
                          }`
                        }
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium text-gray-900">{label}</div>
                            {subtitle && <div className="mt-0.5 truncate text-xs text-gray-500">{subtitle}</div>}
                          </div>
                          <span className={path === currentPath ? "badge-active" : "badge-completed"}>
                            {path === currentPath ? "Active" : "Component"}
                          </span>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </>
        )}

        <main className="min-h-0 flex-1 overflow-y-auto rounded-tl-2xl border-l border-[#E5E7EB] bg-[#F5F6F8]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

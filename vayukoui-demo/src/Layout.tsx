import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { COMPONENT_GROUPS } from "./lib/components";

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

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F6F8]">
      <Navbar onMenuClick={() => setLeftPanelOpen((o) => !o)} />
      <div className="flex flex-1 min-h-0">
        {/* Sidebar: group-based nav, hidden on small screens (see index.css) */}
        <aside
          className="sidebar-list w-[340px] shrink-0 flex-col border-r border-[#E5E7EB] bg-white"
          aria-label="Component list"
        >
          <div className="shrink-0 border-b border-[#E5E7EB] px-4 py-3">
            <span className="text-sm font-semibold text-gray-700">Navigation</span>
          </div>
          <nav className="sidebar-list-nav p-3">
            {COMPONENT_GROUPS.map((group) => (
              <div key={group.id} className="mb-6">
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  {group.label}
                </p>
                <ul className="space-y-2">
                  {group.items.map(({ path, label, subtitle }) => (
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
              </div>
            ))}
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
              <nav className="sidebar-list-nav flex-1 p-3 min-h-0 overflow-y-auto">
                {COMPONENT_GROUPS.map((group) => (
                  <div key={group.id} className="mb-6">
                    <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      {group.label}
                    </p>
                    <ul className="space-y-2">
                      {group.items.map(({ path, label, subtitle }) => (
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
                  </div>
                ))}
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

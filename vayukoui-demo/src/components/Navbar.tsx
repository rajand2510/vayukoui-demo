import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { ComponentGroupData, ComponentItemData } from "../lib/componentData";
import { searchComponents } from "../lib/componentData";
import { GETTING_STARTED } from "../lib/components";

type SearchResult = { group: ComponentGroupData; item: ComponentItemData };
type GroupedResult = { groupId: string; groupLabel: string; items: SearchResult[] };

function SearchResultIcon() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gray-400">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    </span>
  );
}

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results: SearchResult[] = query.trim() ? searchComponents(query) : [];
  const hasResults = results.length > 0;

  // Group results by group id for display
  const resultsByGroup: GroupedResult[] = results.reduce<GroupedResult[]>((acc, { group, item }) => {
    const existing = acc.find((a) => a.groupId === group.id);
    if (existing) {
      existing.items.push({ group, item });
    } else {
      acc.push({ groupId: group.id, groupLabel: group.label, items: [{ group, item }] });
    }
    return acc;
  }, []);

  // Flatten for keyboard index
  const flatResults = resultsByGroup.flatMap((g) => g.items);

  useEffect(() => {
    setHighlightIndex(-1);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || flatResults.length === 0) {
      if (e.key === "Escape") setIsOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => (i < flatResults.length - 1 ? i + 1 : i));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => (i > 0 ? i - 1 : -1));
    } else if (e.key === "Enter" && highlightIndex >= 0 && flatResults[highlightIndex]) {
      e.preventDefault();
      const { item } = flatResults[highlightIndex];
      navigate(item.path);
      setQuery("");
      setIsOpen(false);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (path: string) => {
    navigate(path);
    setQuery("");
    setIsOpen(false);
  };

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
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 20l8-16 8 16" />
            </svg>
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
        <div ref={containerRef} className="relative w-64 sm:w-80">
          {/* Search input always visible in nav — click/focus opens suggestions below */}
          <div className="flex items-center gap-3 rounded-xl bg-[#2C2C2E] py-2 pl-3.5 pr-3 transition-shadow focus-within:ring-2 focus-within:ring-indigo-500/50">
            <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search anything..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
              aria-label="Search components"
              aria-autocomplete="list"
              aria-expanded={isOpen}
              aria-controls="search-suggestions"
            />
          </div>

          {/* Suggestions dropdown — opens below input when focused / has query */}
          {isOpen && (
            <div
              id="search-suggestions"
              role="listbox"
              className="search-overlay search-suggestions absolute left-0 right-0 top-full z-30 mt-1 max-h-[70vh] overflow-y-auto rounded-2xl bg-[#2C2C2E] py-2 shadow-2xl"
            >
              {query.trim() && !hasResults ? (
                <div className="px-4 py-4 text-sm text-gray-400">No components match “{query}”</div>
              ) : results.length === 0 && !query.trim() ? (
                <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Start typing to search components
                </div>
              ) : (
                resultsByGroup.map(({ groupId, groupLabel, items }) => (
                  <div key={groupId} className="mb-1 last:mb-0">
                    <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      {groupLabel}
                    </div>
                    {items.map(({ item }) => {
                      const flatIndex = flatResults.findIndex((r) => r.item.path === item.path);
                      const isHighlighted = flatIndex === highlightIndex;
                      return (
                        <button
                          key={item.path}
                          type="button"
                          role="option"
                          aria-selected={isHighlighted}
                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            isHighlighted ? "bg-[#3F3F3F]" : "hover:bg-[#3F3F3F]/70"
                          }`}
                          onMouseEnter={() => setHighlightIndex(flatIndex)}
                          onClick={() => handleSelect(item.path)}
                        >
                          <SearchResultIcon />
                          <div className="min-w-0 flex-1">
                            <span className="block text-sm font-medium text-white">{item.label}</span>
                            {item.subtitle && (
                              <span className="block text-xs text-gray-400">{item.subtitle}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

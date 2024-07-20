'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  initialSearchTerm?: string;
}

function SearchBar({ initialSearchTerm }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
  const router = useRouter();

  const updateSearchParams = useCallback(
    (term: string) => {
      const searchParams = new URLSearchParams(window.location.search);
      if (term) {
        searchParams.set('search', term);
      } else {
        searchParams.delete('search');
      }
      router.push(`/?${searchParams.toString()}`, { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    updateSearchParams(searchTerm);
  }, [searchTerm, updateSearchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full max-w-md mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Išči turnirje"
        className="w-full p-2 rounded-lg bg-quaternary border border-quinary text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-quinary"
      />
    </div>
  );
}

SearchBar.defaultProps = {
  initialSearchTerm: '',
};

export default SearchBar;

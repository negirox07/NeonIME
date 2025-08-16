'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <Input
        type="search"
        name="query"
        placeholder="Search for an anime..."
        className="pl-10 h-9"
        defaultValue={pathname === '/search' ? searchParams.get('q') ?? '' : ''}
        key={pathname === '/search' ? searchParams.get('q') : 'search-input'}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </form>
  );
}

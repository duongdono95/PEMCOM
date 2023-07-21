'use client';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import Input from '../UI/TextInput/Input';
import './SearchBar.scss';
import { useQuery } from '@tanstack/react-query';
import { Prisma, Subreddit } from '@prisma/client';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import SearchResult from './SearchResult';
const SearchBar = () => {
  const [input, setInput] = useState<string>('');
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useOnClickOutside(commandRef, () => {
    setInput('');
  });

  const request = debounce(async () => {
    refetch();
  }, 300);
  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Subreddit & {
        _count: Prisma.SubredditCountOutputType;
      })[];
    },
    queryKey: ['search-query'],
    enabled: false,
  });

  useEffect(() => {
    setInput('');
  }, [pathname]);
  console.log(commandRef.current?.clientWidth);
  return (
    <div ref={commandRef} className="search-bar">
      <Tippy
        content={<SearchResult width={commandRef.current?.clientWidth} itemList={queryResults} />}
        interactive
        placement="bottom"
        animation="fade"
        arrow={true}
        theme="light-border"
        trigger="click"
        appendTo="parent"
      >
        <Input
          search
          onChange={(e) => {
            setInput(e.target.value);
            debounceRequest();
          }}
          value={input}
          placeholder="Search communities..."
        />
      </Tippy>
    </div>
  );
};

export default SearchBar;

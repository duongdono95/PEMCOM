import { Prisma, Subreddit } from '@prisma/client';
import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface SearchResultProps {
  itemList?: (Subreddit & {
    _count: Prisma.SubredditCountOutputType;
  })[];
  width?: number;
}
const SearchResult: React.FC<SearchResultProps> = ({ itemList, width }) => {
  const router = useRouter();
  return (
    <div style={{ width: width }} className="search-result-container">
      <p className="title">Communities</p>
      {itemList &&
        itemList.map((item, index) => {
          return (
            <div onClick={() => router.push(`r/${item.name}`)} key={index} className="result">
              <Users />
              {item.name}
            </div>
          );
        })}
    </div>
  );
};

export default SearchResult;

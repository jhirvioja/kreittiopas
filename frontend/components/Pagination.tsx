import * as React from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useQuery } from "@apollo/client";

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

export default function PaginationComponent() {
  const router = useRouter();
  const { slugPage } = router.query;
  const currentPage = parseInt(slugPage as string);
  
  const [page, setPage] = React.useState(currentPage? currentPage : 1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const visiblePostCountQuery = gql`
    query {
      visiblePostCount
      }
  `;

  const result = useQuery(visiblePostCountQuery, {
    fetchPolicy: "cache-and-network",
  });

  if (result.loading) {
    return (<div className="pagination-wrapper"><div>Loading pages..</div></div>)
  } else if (result.error) {
    return (<div></div>)
  }
  const paginationCount = Math.ceil(result.data.visiblePostCount / 8)
  return (
    <div className="pagination-wrapper">
      <Pagination
        count={paginationCount}
        page={page}
        onChange={handleChange}
        renderItem={(item) => (<Link href={`/posts/${item.page}`} passHref>
          <PaginationItem
            {...item}
          />
          </Link>
        )}
      />
    </div>
  );
}
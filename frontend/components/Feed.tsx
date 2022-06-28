import * as React from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'
import { gql, useQuery } from '@apollo/client'

import FeedFakeArray from '../components/FeedFakeArray'
import FeedError from '../components/FeedError'
import PostButton from '../components/PostButton'
import Grid from '@mui/material/Grid'

import { isoStringToPvm, truncateDesc } from '../utils/utils.js'

// loader for next/image, dummy version though
const myLoader = (src: any) => {
  return `${src}`
}

export default function Feed() {
  // Construct query for posts
  const POSTS_QUERY = gql`
    query GetVisiblePosts($offset: Int, $limit: Int) {
      getVisiblePosts(visibility: YES, offset: $offset, limit: $limit) {
        id
        title
        slug
        date
        desc
        imgsrc
        type
      }
    }
  `

  const router = useRouter()
  const { slugPage } = router.query
  const currentPage = parseInt(slugPage as string)

  const { loading, data, error } = useQuery(POSTS_QUERY, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    variables: {
      offset: (currentPage ? currentPage : 1) * 8 - 8,
      limit: (currentPage ? currentPage : 1) * 8,
    },
  })

  if (loading) {
    return <FeedFakeArray />
  } else if (error) {
    return <FeedError />
  }
  const newArrayForPosts = [...data.getVisiblePosts]
  return (
    <Grid
      container
      spacing={2}
      className="maincontainer"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {newArrayForPosts.map((post) => (
        <Grid item lg={3} key={post.id}>
          <div className="mainitem">
            <div
              style={{ width: '100%', height: '150px', position: 'relative' }}
            >
              <Image
                loader={myLoader}
                unoptimized={true as boolean}
                src={post.imgsrc}
                alt=""
                layout="fill"
                objectFit="cover"
                priority={true as boolean}
                placeholder="blur"
                blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkrdhXDwADgQG8+wgV7AAAAABJRU5ErkJggg==`}
              />
            </div>
            <h3
              style={{
                minWidth: '240px',
                paddingLeft: '13px',
                paddingRight: '13px',
                wordBreak: 'break-word',
              }}
            >
              {post.title}
            </h3>
            <h4 style={{ color: '#666666', paddingLeft: '13px' }}>
              {isoStringToPvm(post.date)}
            </h4>
            <p
              style={{
                fontSize: '0.9em',
                paddingLeft: '13px',
                paddingRight: '13px',
                lineHeight: '140%',
              }}
            >
              {truncateDesc(post.desc, 156)}
            </p>
            <div className="item-button-container">
              <div className="item-button">
                <PostButton
                  postType={post.type}
                  postTitle={post.title}
                  postSlug={post.slug}
                />
              </div>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  )
}

import * as React from 'react'
import { useState, useEffect } from 'react'

import Head from 'next/head'
import dynamic from 'next/dynamic'
import { gql, useQuery } from '@apollo/client'
import client from '../../apollo-client'
import ReactMarkdown from 'react-markdown'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Skeleton from '@mui/material/Skeleton'
import ShareIcon from '@mui/icons-material/Share'
import Grid from '@mui/material/Grid'

import { isoStringToPvm } from '../../utils/utils.js'
const Nav = dynamic(() => import('../../components/Nav'))
const Footer = dynamic(() => import('../../components/Footer'))

// skeleton loading component

const PostSkeleton = () => {
  return (
    <Grid
      container
      spacing={2}
      className="maincontainer"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {
        <div className="postcontainer">
          <div className="post-skeleton">
            <Skeleton variant="rectangular" width={280} height={200} />
            <Skeleton variant="text" width={280} height={40} />
            <Skeleton variant="text" width={100} height={40} />
            <Skeleton variant="text" width={280} height={100} />
          </div>
        </div>
      }
    </Grid>
  )
}

// error component

const PostError = () => {
  return (
    <div style={{ paddingTop: '10px' }}>
      <Grid
        container
        spacing={2}
        className="maincontainer"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <h2>404 - Sivua ei löytynyt</h2>
      </Grid>
    </div>
  )
}

// one post component

const OnePost = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  // if props are null, then hit the user with 404 because the post is not found
  if (props.props === null) {
    return (
      <div style={{ paddingTop: '10px' }}>
        <Grid
          container
          spacing={2}
          className="maincontainer"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <h2>404 - Sivua ei löytynyt</h2>
        </Grid>
      </div>
    )
  }
  const post = props.props
  const open = Boolean(anchorEl)
  // handle the share menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleFacebook = (event) => {
    console.log('Klikkasit Facebook')
    setAnchorEl(null)
  }
  const handleTwitter = () => {
    console.log('Klikkasit Twitter')
    setAnchorEl(null)
  }
  const handleCopy = () => {
    let siteurl = window.location.href
    navigator.clipboard.writeText(siteurl)
    setAnchorEl(null)
  }

  return (
    <div>
      <Head>
        <title>{post.title} | Kreittiopas.fi | Webzine</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://example.com" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.desc} />
        <meta name="twitter:image" content={post.imgsrc} />
        <meta name="twitter:creator" content="@kreittiopas" />
        <meta property="og:type" content="article" key="ogtype" />
        <meta property="og:title" content={post.title} key="title" />
        <meta property="og:description" content={post.desc} key="desc" />
        <meta property="og:site_name" content="Kreittiopas" />
        <meta property="og:url" content="https://example.com" key="ogtype" />
        <meta property="og:image" content={post.imgsrc} key="ogtype" />
        <meta property="og:published_time" content={post.date} key="pubdate" />
      </Head>
      <Grid
        container
        spacing={2}
        className="maincontainer"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <div className="postcontainer">
          <div className="post">
            <div className="posttype">{post.type}</div>
            <div
              style={{
                backgroundImage: `url(${post.imgsrc})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '250px',
              }}
            ></div>
            <h3
              style={{
                wordBreak: 'break-word',
              }}
            >
              {post.title}
            </h3>
            <span className="postdate">{isoStringToPvm(post.date)}</span>
            <ReactMarkdown>{post.content}</ReactMarkdown>
            <hr></hr>
            <div className="socials">
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant="contained"
                    startIcon={<ShareIcon />}
                  >
                    Jaa
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem
                      id="shareFb"
                      onClick={handleFacebook}
                      sx={{ padding: 2 }}
                    >
                      Facebook
                    </MenuItem>
                    <MenuItem onClick={handleTwitter} sx={{ padding: 2 }}>
                      Twitter
                    </MenuItem>
                    <MenuItem onClick={handleCopy} sx={{ padding: 2 }}>
                      Kopioi linkki&nbsp;&nbsp;&nbsp;
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  )
}

// main layout

export default function Post({ post }) {
  return (
    <div>
      <Nav />
      <main>
        <OnePost props={post} />
      </main>
      <Footer />
    </div>
  )
}

// rendering post server side for seo purposes

export async function getServerSideProps(context) {
  const postSlug = context.params.postSlug
  const { data, error } = await client.query({
    query: gql`
      query {
        findPost(slug: "${postSlug}") {
          id
          author_id
          imgsrc
          date
          title
          slug
          desc
          content
          type
          genres
          artist
          likes
          visibility
        }
      }
    `,
    fetchPolicy: 'no-cache',
  }) // doesn't cache so that admin edits show up immediately
  if (data) {
    return {
      props: {
        post: data.findPost,
      },
    }
  }
}

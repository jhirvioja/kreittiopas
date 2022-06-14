import * as React from "react";
import { useState, useEffect } from "react";

import Link from "next/link";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/client";
import { gql, useQuery, useMutation } from "@apollo/client";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { grey } from '@mui/material/colors';

import SignInComp from "../../components/SignInComp";
import AdminNav from "../../components/AdminNav";
import { isoStringToPvm } from "../../utils/utils.js";

// as it currently stands, the admin panel gets all of the posts
// this might be a perf issue in the future if there are a lot of posts, dunno

// graphql queries that are used in the admin panel
const query = gql`
  query {
    getAllPosts(offset: 0, limit: 9999) {
      id
      title
      slug
      date
      desc
      content
      likes
      imgsrc
      type
      visibility
    }
  }
`;

const REMOVE_VISIBILITY = gql`
  mutation RemoveVisibility($slug: String!) {
    removeVisibility(slug: $slug) {
      slug
    }
  }
`;

const ADD_VISIBILITY = gql`
  mutation AddVisibility($slug: String!) {
    addVisibility(slug: $slug) {
      slug
    }
  }
`;

const REMOVE_POST = gql`
  mutation RemovePost($slug: String!) {
    removePost(slug: $slug) {
      slug
    }
  }
`;

// component which toggles visibility of post

function Toggle(props) {
  const [visibility, setVisibility] = useState((props.visibility === "true"));
  const [removeVisibility, { data, loading, error }] = useMutation(REMOVE_VISIBILITY, {refetchQueries: [ { query: query } ]});
  const [addVisibility, { data2, loading2, error2 }] = useMutation(ADD_VISIBILITY);

  const handleClick = (e) => {
    if (visibility === true) {
      removeVisibility({ variables: { slug: props.slug } })
      setVisibility(false);
    } else {
      addVisibility({ variables: { slug: props.slug } })
      setVisibility(true);
    }
  };

  return (
    <IconButton aria-label="Toggle Visibility" onClick={handleClick}>
      {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </IconButton>
  );
}

// component which deletes post

function Delete(props) {
  const [removePost, { data, loading, error }] = useMutation(REMOVE_POST, {
    refetchQueries: [ { query: query } ]
  });

  const handleClick = (e) => {
    if (confirm("Haluatko varmasti poistaa postauksen " + props.title + "?" + " Toimintoa ei voi perua.") === true) {
      removePost({ variables: { slug: props.slug } })
      console.log("Poistettu postaus :" + props.title);
    } else {
      console.log("Postauksen '" + props.title + "' poisto epäonnistui");
    }
  };

    return (
      <IconButton aria-label="Delete Post" onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    );
  }

// fake array for skeleton loading

const AdminFeedFakeArray = () => {
  const fakearray = [1, 2, 3, 4];
  return (
      <Grid
        container
        spacing={2}
        className="maincontainer"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {fakearray.map((post) => (
          <Grid item lg={3} key={post.toString()}>
            <div className="mainitem">
              <div
                className="itempicture"
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "150px",
                }}
              >
                <p> Lataa kuvaa </p>
              </div>
              <h3
                style={{
                  minWidth: "240px",
                  paddingLeft: "13px",
                  paddingRight: "13px",
                }}
              >
                Lataa sisältöä
              </h3>
              <h4 style={{ color: "#666666", paddingLeft: "13px" }}>
                Lataa sisältöä
              </h4>
              <div className="item-button-container">
                <div className="item-button-admin-skele">
                  <p>Lataa...</p>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
  )
}

// admin feed error message

const AdminFeedError = () => {
  return (
  <div style={{paddingTop: "10px"}}>
  <Head>
    <title>504 | Kreittiopas.fi | Webzine</title>
  </Head>
  <Grid
    container
    spacing={2}
    className="maincontainer"
    direction="row"
    justifyContent="center"
    alignItems="center"
  >
    <h1>504 - Sisällön hakeminen tietokannasta ei onnistunut</h1>
  </Grid>
  </div>
  )
}

// one card component for one post

const PostCard = (posts) => {
  const post = posts.props
  return (
    <Grid item lg={3} key={post.id}>
    <div className="mainitem">
      <div
        className="itempicture"
        style={{
          backgroundImage: `url(${post.imgsrc})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "150px",
        }}
      ></div>
      <h3
        style={{
          minWidth: "240px",
          paddingLeft: "13px",
          paddingRight: "13px",
          wordBreak: "break-word",
        }}
      >
        {post.title}
      </h3>
      <h4 style={{ color: "#666666", paddingLeft: "13px" }}>
        {isoStringToPvm(post.date)}
      </h4>
      <div
        style={{
          paddingLeft: "13px",
        }}
      ></div>
        <div className="item-button-container" style={{paddingTop: "10px"}}>
          <div className="item-button-admin" style={{textDecoration: "none"}}>
            <Toggle visibility={post.visibility} slug={post.slug}/>
            <IconButton aria-label="Edit Post" component="span">
              <Link href={`../editor/${post.slug}/`} passHref>
                <EditIcon color="action" style={{width:"30px"}}/>
              </Link>
            </IconButton>
            <Delete slug={post.slug} title={post.title} />
          </div>
        </div>
      </div>
    </Grid>
  )
}

// deleted post card, not used anymore but can be implemented later
// the main idea was that you probably shouldn't be able to delete posts permanently
// some sort of rubbish bin should be implemented instead so that if deletion is erroneous
// you can still recover the post

const DeletedPostCard = (posts) => {
  const post = posts.props
  return (
    <Grid item lg={3} key={post.id}>
      <div className="mainitem">
        <div
          className="itempicture"
          style={{
            backgroundImage: `url(${post.imgsrc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "150px",
            opacity: "0.5",
          }}
        ></div>
        <h3
          style={{
            minWidth: "240px",
            paddingLeft: "13px",
            paddingRight: "13px",
            opacity: "0.5",
          }}
        >
          {post.title}
        </h3>
        <h4 style={{ color: "#666666", paddingLeft: "13px", opacity: "0.5", }}>
          {isoStringToPvm(post.date)}
        </h4>
        <div
          style={{
            paddingLeft: "13px",
          }}
        ></div>
        <div className="item-button-container" style={{paddingTop: "10px"}}>
          <div className="item-button-admin" style={{textDecoration: "none", opacity: "0.5"}}>
            <h5>Poistettu</h5>
          </div>
        </div>
      </div>
    </Grid>
  )
}

// the main feed component for admin users, a stripped down version of the feed component

const AdminFeed = () => {
  const result = useQuery(query);
  if (result.loading) {
    return (<AdminFeedFakeArray />);
  } else if (result.error) {
    return (<AdminFeedError />);
  }
  const newArrayForPosts = [...result.data.getAllPosts]
  // console.log(newArrayForPosts)
  return (
    <Grid
      container
      spacing={2}
      className="maincontainer"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
    {newArrayForPosts.map((post) => post.slug === "" ? <DeletedPostCard props={post} /> : <PostCard props={post} />)}
  </Grid>
  )
}

// main layouting, sign in session checking

const AdminPanel = () => {
  const [session, loading] = useSession() // checks if you are signed in
  if (session) {
  return (
    <div>
      <Head>
        <title>Adminpaneeli | Kreittiopas.fi | Webzine</title>
      </Head>
      <AdminNav props={session.user.email} />
      <Grid
        container
        spacing={2}
        className="maincontainer"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          sx={{ marginTop: "30px", marginLeft: "14px" }}
        >
        <Link href={`../adder/`} passHref>
        <IconButton color="primary" aria-label="Add a post" component="span">
          <AddIcon sx={{ color: grey[50] }} />
        </IconButton>
        </Link>
        </Fab>
      </Grid>
      <AdminFeed />
      <Grid
        container
        spacing={2}
        className="maincontainer"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
      </Grid>
    </div>
  );
}
return (<SignInComp />) // if you are not signed in, you are forwared to here
};

export default AdminPanel;

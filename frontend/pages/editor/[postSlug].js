import * as React from "react";
import { useState, useEffect } from "react";

import { useRouter } from 'next/router'
import { gql, useQuery, useMutation } from "@apollo/client";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Contrast } from "@mui/icons-material";

import { withTheme } from "@emotion/react";

import SignInComp from "../../components/SignInComp";
import AdminNav from "../../components/AdminNav";


// graphql query to get all posts, edit post
// getAllPosts is probably here for error checking purposes
// you will have to check slugs in the database to not make posts have same slugs

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

const EDIT_POST = gql`
  mutation EditPost($slug: String!, $title: String!, $desc: String!, $content: String!, $type: String!) {
    editPost(slug: $slug, title: $title, desc: $desc, content: $content, type: $type) {
      id
      title
      slug
      date
      desc
      content
      likes
      imgsrc
      type
    }
  }
`;

// form part of the page 

function EditForm(props) {
  const [editPost, { data, loading, error }] = useMutation(EDIT_POST, {
    refetchQueries: [
      { query: query }
    ]
  });
  const [open, setOpen] = React.useState(false);

  const post = props.props

  const [inputs, setInputs] = useState({
    type: post.type,
    title: post.title,
    imgsrc: post.imgsrc,
    desc: post.desc,
    content: post.content,
    slug: post.slug,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  
  // alert thingy
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // uncomment next ones to debug
    // console.log(inputs)
    // console.log(inputs.slug)
    // console.log(inputs.title)
    // console.log(inputs.content)
    // console.log(inputs.desc)
    // console.log(inputs.type)
    editPost({ variables: { slug: inputs.slug, title: inputs.title, content: inputs.content, desc: inputs.desc, type: inputs.type } })
    setOpen(true);
  }

  // alert closing
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="postformwrapper">
    <form onSubmit={handleSubmit}>
      <label htmlFor="type">Postauksen tyyppi:</label>
      <select name="type" defaultValue={post.type} onChange={handleChange}>
        <option value="Artikkeli">Artikkeli</option>
        <option value="Mainos">Mainos</option>
        <option value="Podcast">Podcast</option>
      </select>
      <label htmlFor="title">Postauksen otsikko:</label>
        <input id="iotsikko" name="title" type="text" defaultValue={post.title} onChange={handleChange} />
      <label htmlFor="imgsrc">Postauksen kuva (URL, 1920x1080 .jpg):</label>
        <input id="imgsrc" name="imgsrc" type="text" defaultValue={post.imgsrc} onChange={handleChange} />
      <label htmlFor="desc">Postauksen kuvaus etusivulla (muutama lause):</label>
        <input id="desc" name="desc" type="text" defaultValue={post.desc} onChange={handleChange} />
      <textarea id="content" name="content" defaultValue={post.content} onChange={handleChange}></textarea>
      <input id="submitbutton" type="submit" value="Submit"/>
    </form>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert variant="outlined" onClose={handleClose} severity="success" sx={{ width: "100%", color: "inherit" }}>
        Postauksen editointi onnistui! <a href={`/post/${post.slug}`}>Katso postausta.</a>
      </Alert>
    </Snackbar>
    </div>
  )
}

// main layouting of the page

const OnePostEdit = () => {
  const router = useRouter();
  const { postSlug } = router.query;
  const query = gql`
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
  `;

  const result = useQuery(query, { errorPolicy: 'all' });

  if (result.loading) {
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
              <h2>Lataa...</h2>
            </div>
          </div>
        }
      </Grid>
    );
  }
  else if (result.error) {
    return (<div style={{paddingTop: "10px"}}>
    <Head>
      <title>404 | Kreittiopas.fi | Webzine</title>
    </Head>
    <Grid
      container
      spacing={2}
      className="maincontainer"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <h1>404 - Sisältöä ei löytynyt editoitavaksi</h1>
    </Grid>
  </div>);
  }
  
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
        <Head>
          <title>Editoi {result.data.findPost.title} | Kreittiopas.fi</title>
        </Head>
        <h2 style={{textAlign: "center"}}>Editoi postausta</h2>
        <Grid
          container
          spacing={2}
          className="maincontainer"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
        <Button style={{margin: '10px', padding: '10px'}} size="small" variant="text" onClick={() =>history.back()}>{`<<`} Takaisin</Button>
        </Grid>
          <div className="post">
            <EditForm props={result.data.findPost} />
          </div>
        </div>
      }
    </Grid>
  );
};

// checks if you are signed in or not

const Editor = () => {
  const [session, loading] = useSession()
  if (session) {
    return (
      <>
        <AdminNav props={session.user.email} />
        <OnePostEdit />
      </>
    )
  }
  return (<SignInComp />) // redirects you here if you are not signed in
}

export default Editor;
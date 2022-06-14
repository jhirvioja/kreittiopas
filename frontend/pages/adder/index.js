import { useState, useEffect } from "react";

import Head from "next/head";
import { gql, useQuery, useMutation } from "@apollo/client";
import urlSlug from 'url-slug'
import { useSession, signIn, signOut } from "next-auth/client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import SignInComp from "../../components/SignInComp";
import AdminNav from "../../components/AdminNav";

// graphql query to add a post

const ADD_POST = gql`
  mutation AddPost($imgsrc: String!, $slug: String!, $title: String!, $desc: String!, $content: String!, $type: String!) {
    addPost(imgsrc: $imgsrc, slug: $slug, title: $title, desc: $desc, content: $content, type: $type) {
      imgsrc
      title
      slug
      desc
      content
      type
    }
  }
`;

// form which sends data

function AddForm() {
  const [addPost, { data, loading, error }] = useMutation(ADD_POST);
  const [open, setOpen] = useState(false);

  // some initial states for the form, not sure if these should exist
  const [inputs, setInputs] = useState({
    type: "Artikkeli",
    title: "Kirjoita tähän otsikko",
    imgsrc: "https://i.imgur.com/yh5mBJn.webp",
    desc: "Kirjoita tähän lyhyt kuvaus",
    content: "Kirjoita tähän sisältöä",
    slug: "testi",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  
  // needed for "success" alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmit = (event) => {
    const safeslugi = urlSlug(inputs.title); // this makes the slug safe for use in the url
    event.preventDefault(); // prevents actual submit
    addPost({ variables: { slug: safeslugi, title: inputs.title, content: inputs.content, desc: inputs.desc, type: inputs.type, imgsrc: inputs.imgsrc } })
    setOpen(true);
    // post has now been added if code just reaches this point
  }

  // closes alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // form here
  return (
    <div className="postformwrapper">
    <form onSubmit={handleSubmit}>
      <label htmlFor="type">Postauksen tyyppi:</label>
      <select name="type" defaultValue={"Artikkeli"} onChange={handleChange}>
        <option value="Artikkeli">Artikkeli</option>
        <option value="Mainos">Mainos</option>
        <option value="Podcast">Podcast</option>
      </select>
      <label htmlFor="title">Postauksen otsikko:</label>
        <input id="iotsikko" name="title" type="text" defaultValue={"Kirjoita tähän otsikko"} onChange={handleChange} />
      <label htmlFor="imgsrc">Postauksen kuva (URL, 1920x1080 .jpg):</label>
        <input id="imgsrc" name="imgsrc" type="text" defaultValue={"https://i.imgur.com/yh5mBJn.webp"} onChange={handleChange} />
      <label htmlFor="desc">Postauksen kuvaus etusivulla (muutama lause):</label>
        <input id="desc" name="desc" type="text" defaultValue={"Kirjoita tähän lyhyt kuvaus"} onChange={handleChange} />
      <textarea id="content" name="content" defaultValue={"Kirjoita tähän sisältöä"} onChange={handleChange}></textarea>
      <input id="submitbutton" type="submit" value="Submit"/>
    </form>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert variant="outlined" onClose={handleClose} severity="success" sx={{ width: "100%", color: "inherit" }}>
        Postauksen lisäys onnistui!
      </Alert>
    </Snackbar>
    </div>
  )
}

// page layouting
const OnePostAdd = () => {
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
          <title>Lisää postaus | Kreittiopas.fi</title>
        </Head>
        <h2 style={{textAlign: "center"}}>Lisää postaus</h2>
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
            <AddForm />
          </div>
        </div>
      }
    </Grid>
    )
}

// sign in behavior
const Adder = () => {
  const [session, loading] = useSession() // checks if you are signed in to the admin panel
  if (session) {
    return (
      <>
        <AdminNav props={session.user.email} />
        <OnePostAdd />
      </>
    )
  }
  return (<SignInComp />) // if not signed takes you to the sign in page
}

export default Adder;
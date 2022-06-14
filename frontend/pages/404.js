import Grid from "@mui/material/Grid";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Error = () => {
  return(
    <div style={{paddingTop: "10px"}}>
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

export default function Custom404() {
  return (<>
  <Nav />
  <main>
  <Error />
    </main>
  <Footer />
  </>)
}
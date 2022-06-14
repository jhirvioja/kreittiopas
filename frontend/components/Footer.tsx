/* eslint-disable @next/next/no-html-link-for-pages */
import * as React from "react";

import IconButton from "@mui/material/IconButton";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Grid from "@mui/material/Grid";

const Footer = () => (
  <footer className="footer">
    <div className="footerwrapper">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item lg={2} padding={2.5}>
          <a href="/info">
             <span className="footertext">© Kreittiopas.fi</span> 
          </a>
        </Grid>
        <Grid item lg={2} padding={2.5}>
          <a href="/yhteystiedot">
            <span className="footertext">Yhteystiedot</span> 
          </a>
        </Grid>
        <Grid item lg={2} padding={2.5}>
          <a href="/tietosuoja">
            <span className="footertext">Tietosuoja</span> 
          </a>
        </Grid>
        <Grid item lg={2} padding={2.5}>
          <a href="/saavutettavuus">
          <span className="footertext">Saavutettavuus</span> 
          </a>
        </Grid>
        <Grid item lg={2} padding={0}>
          <div className="app-wrapper">
            <a href="#" className="app-button black">
              Asenna Kreittiopas-sovellus (iOS, Android)
            </a>
          </div>
        </Grid>
        <Grid item lg={2}>
          <div className="socials-wrapper">
            <IconButton aria-label="Facebook" size="small">
              <FacebookOutlinedIcon
                sx={{ fontSize: 35, padding: 1, color: "#0578be" }}
              />
            </IconButton>
            <IconButton aria-label="Twitter" size="small">
              <TwitterIcon sx={{ fontSize: 30, padding: 1, color: "#0578be" }} />
            </IconButton>
            <IconButton aria-label="Instagram" size="small">
              <InstagramIcon
                sx={{ fontSize: 35, padding: 1, color: "#0578be" }}
              />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </div>
  </footer>
);

export default Footer;

import * as React from 'react'

import Grid from '@mui/material/Grid'

export default function FeedError() {
  return (
    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
      <Grid
        container
        spacing={2}
        className="maincontainer"
        direction="row"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Grid item lg={3}>
          Hups! Sisällön haku tietokannasta epäonnistui. Nettiyhteytesi voi olla
          heikko, olet lentokonetilassa tai tietokanta on alhaalla.
        </Grid>
      </Grid>
    </div>
  )
}

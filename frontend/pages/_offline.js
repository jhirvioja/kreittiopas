import Head from 'next/head'
import dynamic from 'next/dynamic'

import Grid from '@mui/material/Grid'

const Nav = dynamic(() => import('../components/Nav'))
const Footer = dynamic(() => import('../components/Footer'))

export default function Offline() {
  return (
    <div>
      <Head>
        <title>Offline | Kreittiopas.fi | Webzine</title>
      </Head>
      <Nav />
      <main>
        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <Grid
            container
            spacing={2}
            className="maincontainer"
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item lg={3}>
              <center>
                Hups! Sivua ei voitu hakea. Nettiyhteytesi voi olla heikko tai
                olet lentokonetilassa.
              </center>
            </Grid>
          </Grid>
        </div>
      </main>
      <Footer />
    </div>
  )
}

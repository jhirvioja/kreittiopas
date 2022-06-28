import Head from 'next/head'
import dynamic from 'next/dynamic'

import Grid from '@mui/material/Grid'

const Nav = dynamic(() => import('../components/Nav'))
const Footer = dynamic(() => import('../components/Footer'))

export default function Info() {
  return (
    <div>
      <Head>
        <title>Info | Kreittiopas.fi | Webzine</title>
        <meta
          property="og:title"
          content="Tietoa Kreittioppaasta"
          key="title"
        />
      </Head>
      <Nav />
      <main>
        <Grid
          container
          spacing={2}
          className="maincontainer"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <div className="pagecontainer">
            <div className="page">
              <h3 className="pageheader">Tietoa Kreittioppaasta</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tincidunt, libero id vulputate finibus, diam tortor pretium
                quam, a lobortis dolor erat non risus. Sed nec augue purus.
                Donec mattis leo vitae libero pulvinar ultricies. Integer
                commodo, felis id tincidunt suscipit, metus ligula eleifend leo,
                et tincidunt ex libero nec mauris. Suspendisse eros turpis,
                finibus eu pretium eget, porttitor id augue. Mauris felis
                tortor, consectetur ut dolor ornare, vestibulum pretium libero.
                Vestibulum vestibulum sagittis tempus. Quisque non lorem mauris.
                Fusce in sollicitudin mauris.
              </p>
              <p>
                Nunc finibus dui quis tristique tincidunt. Sed ligula ante,
                mollis vel tellus vitae, tempus tempor massa. Vestibulum et
                velit eget augue dictum iaculis eu quis dui. Nam metus mi,
                dignissim lobortis turpis ut, faucibus malesuada nisl. Nunc
                mattis velit neque, at imperdiet justo fringilla nec. Vestibulum
                malesuada, justo quis finibus luctus, est nibh condimentum
                libero, luctus accumsan ex mi vel quam. Vestibulum ac congue ex,
                at scelerisque sapien. Maecenas maximus ex quis condimentum
                maximus. Pellentesque leo sapien, fringilla et dolor sed,
                accumsan malesuada diam. In iaculis vehicula sapien eget cursus.
              </p>
              <p>
                Curabitur ac sodales neque, eu mollis massa. Integer eget
                convallis neque. Vestibulum ante ipsum primis in faucibus orci
                luctus et ultrices posuere cubilia curae; Cras fringilla augue
                mi, nec posuere ante vestibulum sed. Quisque sit amet posuere
                magna. Pellentesque non volutpat nunc. Aliquam velit nisl,
                pellentesque non libero sed, hendrerit posuere turpis. Phasellus
                imperdiet justo eu pharetra consectetur. Phasellus viverra vitae
                metus id maximus. Fusce efficitur accumsan massa, sed eleifend
                orci ornare vitae. Aliquam erat volutpat. In pretium, leo nec
                fermentum lobortis, ante velit viverra odio, sed tincidunt nulla
                leo ut dui. Curabitur at malesuada eros.
              </p>
              <p>
                Fusce blandit cursus tortor, sed aliquet magna bibendum nec.
                Nunc vitae ligula quis velit molestie dictum ut eu metus.
                Vestibulum a turpis ac lectus aliquam euismod id et odio. Mauris
                in tempor urna. Donec quis augue nulla. Donec eu metus turpis.
                Mauris tempor lectus vitae nisl scelerisque placerat. Duis
                mattis magna ut mi iaculis, eget finibus eros tincidunt. Nam in
                sollicitudin est. Integer eu tortor consequat, tincidunt elit
                et, semper erat. Aliquam a molestie arcu, quis tincidunt lorem.
              </p>
            </div>
          </div>
        </Grid>
      </main>
      <Footer />
    </div>
  )
}

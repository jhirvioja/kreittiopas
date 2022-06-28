import * as React from 'react'

import Image from 'next/image'
import Grid from '@mui/material/Grid'
import { signIn } from 'next-auth/client'
import kologoblue from '../public/kreittiopas-logo-blue-svgo.svg'

export default function SignInComp() {
  return (
    <Grid
      container
      spacing={2}
      className="maincontainer"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <div className="signinwrapper">
        <div className="signinlogo">
          <Image
            src={kologoblue}
            width={60}
            height={60}
            alt="Kreittiopas Logo"
            aria-label="Etusivulle"
          />
        </div>
        <div className="signinbox">
          <p>Not signed in</p>
          <button id="signinbutton" onClick={() => signIn()}>
            Sign in
          </button>
        </div>
      </div>
    </Grid>
  )
}

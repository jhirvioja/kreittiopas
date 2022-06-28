/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import * as React from 'react'

import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

const centerkoLogo = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
} as React.CSSProperties

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 50,
    backgroundColor: '#0578be',
  },
}))

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} color="primary" position="static">
        <StyledToolbar>
          <div style={centerkoLogo}>
            <a href="/">
              <span className="kologo">
                <img
                  src="/kreittiopas-logo-white-svgo.svg"
                  aria-label="Etusivulle"
                  width="60"
                  height="60"
                />
              </span>
            </a>
          </div>
        </StyledToolbar>
      </AppBar>
    </Box>
  )
}

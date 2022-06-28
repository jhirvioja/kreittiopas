import * as React from 'react'

import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

export default function FeedFakeArray() {
  // This is a fake array to render skeletons for the initial loading phase of fetching data
  const fakeArray = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <Grid
      container
      spacing={2}
      className="maincontainer"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {fakeArray.map((post) => (
        <Grid item lg={3} key={post.toString()}>
          <div className="mainitem">
            <div
              className="itemPictureSkeleton"
              style={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '150px',
              }}
            >
              <Skeleton variant="rectangular" height={150} />
            </div>
            <h3
              style={{
                minWidth: '240px',
                paddingLeft: '13px',
                paddingRight: '13px',
              }}
            >
              <Skeleton variant="text" width={240} />
            </h3>
            <h4 style={{ color: '#666666', paddingLeft: '13px' }}>
              <Skeleton variant="text" width={100} />
            </h4>
            <p
              style={{
                fontSize: '0.9em',
                paddingLeft: '13px',
                paddingRight: '13px',
              }}
            >
              <Skeleton variant="text" width={240} />
              <Skeleton variant="text" width={240} />
              <Skeleton variant="text" width={240} />
            </p>
            <div className="item-button-container">
              <div className="item-button">
                <Skeleton variant="rectangular" width={130} height={30} />
              </div>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  )
}

import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import random from 'lodash/random';

export default React.memo(function MessageSkeleton() {
  return (
    <Box display="flex" mb={2}>
      <Box mr={1}>
        <Skeleton animation="wave" variant="circle" width={32} height={32} />
      </Box>
      <Box width="100%">
        <Typography>
          <Skeleton animation="wave" width={`${random(10, 20)}%`} />
        </Typography>
        <Typography>
          <Skeleton animation="wave" width={`${random(50, 75)}%`} />
        </Typography>
        <Typography>
          <Skeleton animation="wave" width={`${random(50, 75)}%`} />
        </Typography>
        <Typography>
          <Skeleton animation="wave" width={`${random(40, 60)}%`} />
        </Typography>
      </Box>
    </Box>
  );
});

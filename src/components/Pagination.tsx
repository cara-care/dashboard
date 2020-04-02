import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
});

interface Props {
  count: number;
  limit: number;
  page: number;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const Pagination: React.FC<Props> = ({
  count,
  limit,
  page,
  onClickPrev,
  onClickNext,
}) => {
  const classes = useStyles();
  const totalPages = Math.ceil(count / limit);
  const isFirstPage = page === 0;
  const isLastPage = totalPages === page + 1;

  return (
    <div className={classes.root}>
      <Typography variant="body2">
        <FormattedMessage
          id="pagination.pageOf"
          defaultMessage="Page {currentPage} of {totalPages}"
          values={{
            currentPage: page + 1,
            totalPages,
          }}
        />
      </Typography>
      <IconButton disabled={isFirstPage} onClick={onClickPrev}>
        <ChevronLeft />
      </IconButton>
      <IconButton disabled={isLastPage} onClick={onClickNext}>
        <ChevronRight />
      </IconButton>
    </div>
  );
};

export default Pagination;

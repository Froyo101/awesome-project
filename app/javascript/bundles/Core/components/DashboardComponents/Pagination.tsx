import * as React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DashboardActions from "../../state/actions/DashboardActions";
import { mapStateToPropsDashboard } from "../../state/StateToProps";

import { makeStyles, Button } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles({
  pagination: {},
  control: {
    backgroundColor: "#38a3a5",
    color: "white",
    margin: "8px 4px",
  },
  number: {
    color: "#38a3a5",
    margin: "4px 2px",
    padding: "4px",
    cursor: "pointer",
    "&:hover": {
      borderRadius: "4px",
      backgroundColor: "#38a3a5",
      color: "white",
    },
  },
  activeNumber: {
    margin: "4px 2px",
    padding: "4px",
    cursor: "pointer",
    borderRadius: "4px",
    backgroundColor: "#38a3a5",
    color: "white",
  },
});

const Pagination: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators(DashboardActions, props.dispatch);
  const classes = useStyles();

  const currentPage = props.dashboardStore.currentPage;
  const maxPage = Math.ceil(
    props.dashboardStore.projects.length / props.dashboardStore.projectsPerPage
  );
  let pageNumbers = [];

  for (let i = 1; i <= maxPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      actions.changePage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < maxPage) {
      actions.changePage(currentPage + 1);
    }
  };

  return (
    <nav>
      <Button className={classes.control} size="small" onClick={handlePrev}>
        <ChevronLeftIcon />
      </Button>

      {pageNumbers.map((number) => (
        <span
          className={number === currentPage ? classes.activeNumber : classes.number}
          key={number}
          onClick={() => actions.changePage(number)}
        >
          {number}
        </span>
      ))}

      <Button className={classes.control} size="small" onClick={handleNext}>
        <ChevronRightIcon />
      </Button>
    </nav>
  );
};

export default connect(mapStateToPropsDashboard)(Pagination);

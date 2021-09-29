import * as React from "react";

import { connect } from "react-redux";
import { mapStateToPropsDashboard } from "../../state/StateToProps";

import { makeStyles, Button } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles({
  pagination: {
    
  },
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

  },
});

const Pagination: React.FunctionComponent<any> = (props: any) => {
  const classes = useStyles();
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.dashboardStore.projects.length / props.dashboardStore.projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <Button className={classes.control} size="small" ><ChevronLeftIcon /></Button>
      
        {pageNumbers.map((number) => (
          
            <span className={classes.number} key={number}>{number}</span>
          
        ))}
      
      <Button className={classes.control} size="small" ><ChevronRightIcon /></Button>
    </nav>
  );
}

export default connect(mapStateToPropsDashboard)(Pagination);
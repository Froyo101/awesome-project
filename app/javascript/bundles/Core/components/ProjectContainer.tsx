import * as React from "react";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as ProjectActions from "../state/actions/ProjectActions";
import { mapStateToPropsProject } from "../state/StateToProps";

import ProjectDetailView from "./ProjectDetailView";

interface Props {
  dispatch: Dispatch,
  match: any,
  projectStore: any,
}

class ProjectContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  //actions = bindActionCreators(ProjectActions, this.props.dispatch);

  componentDidMount() {
    //this.actions.loadProject(this.props.dispatch, this.props.match.params.projectId);
    if (this.props.projectStore.projectId.toString() !== this.props.match.params.projectId.toString()) ProjectActions.loadProject(this.props.dispatch, this.props.match.params.projectId);
  }

  componentWillUnmount() {
    //this.actions.clearProject();
    this.props.dispatch(ProjectActions.clearProject());
  }

  render() {
    return <ProjectDetailView />;
  }
}

export default connect(mapStateToPropsProject)(ProjectContainer);
import * as React from "react";

import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

const AddElementButton: React.FunctionComponent<any> = (props: any) => {
  switch (props.type) {
    case "NEW_BUCKET":
      return (
        <div>
          <AddCircleOutlineOutlinedIcon />
          <p>Add another bucket</p>
        </div>
      );
    case "NEW_CARD":
      return (
        <div>
          <AddCircleOutlineOutlinedIcon />
          <p>Add another card</p>
        </div>
      );
    default:
      return (
        <div>
          <AddCircleOutlineOutlinedIcon />
        </div>
      );
  }
};

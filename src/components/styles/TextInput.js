import {
  COLOR_CRAB_SHELL_CYAN,
  COLOR_YAQING,
  COLOR_ERROR_RED
} from "../../contants";

const styles = {
  container: {
    height: 51,
    width: 386,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  input: {
    fontSize: 25,
    borderStyle: "none",
    outline: "none",
    width: "100%",
    color: COLOR_YAQING
  },
  line: err => ({
    borderBottomWidth: 1,
    borderBottomColor: err ? COLOR_ERROR_RED : COLOR_CRAB_SHELL_CYAN,
    borderBottomStyle: "solid"
    // borderBottom: "1px solid " + COLOR_CRAB_SHELL_CYAN,
  }),
  errMsg: {
    textAlign: "start"
  }
};

export default styles;

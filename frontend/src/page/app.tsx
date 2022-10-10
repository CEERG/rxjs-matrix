import Matrix from "./matrix/matrix";
import React, { FunctionComponent } from "react";
import Settings from "./settings/settings";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import AppStore from "stores/app";

import styles from "./app.less";

const App: FunctionComponent<{
  app: AppStore
}> = ({
  app
}) => {
  return <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
    <CssBaseline />

    <div className={ styles.app }>
      <Settings matrix={ app.matrix } fontSize={ app.fontSize } tickRateMeasurer={ app.tickRateMeasurer } />
      <Matrix columnsManager={ app.matrix.columnsManager } fontSize={ app.fontSize }/>
    </div>

  </ThemeProvider>;
};

export default App;
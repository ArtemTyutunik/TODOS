import {withStore} from "./providers/withStore";
import Header from "../widgets/header";
import React from "react";
import {Box} from "@mui/material";

function App() {
  return (
      <Box>
          <Header/>
      </Box>
  )
}

export default withStore(App)

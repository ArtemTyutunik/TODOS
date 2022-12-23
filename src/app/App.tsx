import {withStore} from "./providers/withStore";
import React from "react";
import {Box} from "@mui/material";
import AppLayout from "./ui/appLayout";

function App() {
  return (
      <Box>
          <AppLayout/>
      </Box>
  )
}

export default withStore(App)

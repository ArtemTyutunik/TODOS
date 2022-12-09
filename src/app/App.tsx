import {withStore} from "./providers/withStore";
import Header from "../widgets/header";

function App() {
  return (
    <div className="App">
      <Header/>
    </div>
  )
}

export default withStore(App)

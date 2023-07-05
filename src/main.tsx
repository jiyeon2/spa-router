import ReactDOM from "react-dom/client";
import About from "./pageComponents/About.tsx";
import Root from "./pageComponents/Root.tsx";
import Route from "./Route.tsx";
import Router from "./Router.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);

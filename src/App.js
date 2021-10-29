import logo from './logo.svg';
import './App.css';
import UserCrud from './userCrud';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={UserCrud} >
            <UserCrud />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

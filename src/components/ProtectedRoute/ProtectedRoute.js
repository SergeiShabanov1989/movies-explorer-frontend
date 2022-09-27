import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children, ...props }) => {
    return (
      <Route {...props}>
        {loggedIn === false ? <Redirect to="/"/> : children}
      </Route>
    )
}

export default ProtectedRoute;
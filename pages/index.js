import Todos from "./todos";
import withAuth from "../components/withAuth"; // Import the withAuth HOC

// Home component which renders the Todos component
function Home() {
  return <Todos />;
}

// Wrap the Home component with the withAuth HOC to add authentication logic
export default withAuth(Home);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'

function App() {
  return (
    <div>
      <Button as="h1" text="secondary"></Button>
     <FontAwesomeIcon icon={faCoffee} />
    </div>
  );
}

export default App;

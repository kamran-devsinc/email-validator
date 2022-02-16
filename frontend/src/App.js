import './App.css';
import EmailValidator from 'components/EmailValidator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <EmailValidator />
    </div>
  );
}

export default App;

import { ToastContainer } from 'react-toastify';
import Router from './routes';
import { GlobalStyles } from './styles/global';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './providers/UserContext/UserContext';

const App = () => (
  <>
    <GlobalStyles />
    <UserProvider>
      <Router />
    </UserProvider>
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
    {/* Same as */}
    <ToastContainer />
  </>
);

export default App;

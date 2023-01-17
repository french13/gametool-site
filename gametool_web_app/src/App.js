import './App.scss';
import 'remixicon/fonts/remixicon.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import RoutesContainer from './routes/Routes';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <RoutesContainer/>
    </div>
  );
}

export default App;

import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Calculator from './Components/Calculator/Calculator';
import Table from './Components/Table/Table';
import UndoRedo from './Components/UndoRedo/UndoRedo';

function App() {
  return (
    <Router>
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li><Link to={'/calculator'} className="nav-link"> Calculator </Link></li>
              <li><Link to={'/Table'} className="nav-link">Table</Link></li>
              <li><Link to={'/undoredo'} className="nav-link">Undo-Redo</Link></li>
            </ul>
          </nav>
          <hr/>
          <Routes>
            <Route path='/calculator' element={<Calculator/>}></Route>
            <Route path='/table' element={<Table/>}></Route>
            <Route path='/undoredo' element={<UndoRedo/>}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;

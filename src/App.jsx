import { BrowserRouter } from 'react-router';
import PageLayout from './components/PageLayout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <PageLayout />
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        { routes.map((route, index) => (
          route.component && (
            <Route
              key={ index }
              path={ route.path }
              element={ <route.component /> }
            />
          )
        )) }
      </Routes>
    </Router>
  )
}

export default App

import { HashRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';

function App() {
  return (
    <>
      <HashRouter basename="/">
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
      </HashRouter>
    </>
  )
}

export default App
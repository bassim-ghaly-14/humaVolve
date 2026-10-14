import { AppProvider } from './components/providers/AppProvider';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';

/** Root application composition. */
function App() {
  return (
    <AppProvider>
      <Navbar />
      <Home />
      <Footer />
    </AppProvider>
  );
}

export default App;

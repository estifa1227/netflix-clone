import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MyListProvider } from './context/MyListContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MyListProvider>
          <AppRoutes />
        </MyListProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import GlobalStyles from './styles/GlobalStyles';
import Order from './pages/Order';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CheckOut from './pages/CheckOut';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import Products from './pages/Products';
import ManageProducts from './pages/ManageProducts';
import ProtectedRoute from './ui/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='products' />} />
            <Route path='products' element={<Products />} />
            <Route path='product/:id' element={<ProductPage />} />
            <Route path='cart' element={<Cart />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='order' element={<Order />} />
            <Route path='checkout' element={<CheckOut />} />

            <Route
              path='manage'
              element={
                <ProtectedRoute>
                  <ManageProducts />
                </ProtectedRoute>
              }
            />

            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position='top-center'
        gutter={16}
        containerStyle={{ margin: '16px' }}
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#000000',
            fontSize: '20px',
            maxWidth: '500px',
            padding: '16px 24px',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#000',
              secondary: '#d4d4d4',
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: 'black',
              secondary: 'gray',
            },
          },
          iconTheme: {
            primary: '#000',
            secondary: '#d4d4d4',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

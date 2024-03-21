import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
            <Route path='productpage' element={<ProductPage />} />
            <Route path='cart' element={<Cart />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='order' element={<Order />} />
            <Route path='checkout' element={<CheckOut />} />
            <Route path='manage' element={<ManageProducts />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

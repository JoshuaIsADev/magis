import { useEffect } from 'react';
import { getProducts } from '../services/apiProducts';

function Home() {
  useEffect(function () {
    getProducts().then((data) => console.log(data));
  }, []);

  return <div>Home</div>;
}

export default Home;

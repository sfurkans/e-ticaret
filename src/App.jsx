import { useState, useEffect } from 'react';
import './App.css';
import PageContainer from './container/PageContainer';
import Header from './components/Header';
import Routerconfig from './config/Routerconfig';
import Loading from './components/Loading';
import Drawer from '@mui/material/Drawer';
import './css/Drawer.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer, calculateSepet, removeFromSepet } from './redux/slice/SepetSlice'; // removeFromSepet ekledik

function App() {
  const { products, drawer, totalAmount } = useSelector((store) => store.sepet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateSepet());
  }, [products, dispatch]); // products değiştiğinde tekrar hesaplanmasını sağlarız

  const handleRemoveProduct = (id) => {
    dispatch(removeFromSepet({ id })); // Ürünü silmek için id'yi nesne olarak gönderiyoruz
    dispatch(calculateSepet()); // Ürün silindikten sonra sepeti tekrar hesapla
  };

  return (
    <div>
      <PageContainer>
        <Header />
        <Routerconfig />
        <Loading />
        <Drawer open={drawer} sx={{ padding: '20px' }} anchor='right' onClose={() => dispatch(setDrawer())}> 
          {products && products.map((product) => (
            <div key={product.id} className='flex-row' style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
              <img src={product.image} width={50} height={50} className='drawer-img' alt={product.title} />
              <p className='drawer-p1'>{product.title} ({product.count})</p>
              <p className='drawer-p2'>{product.price} TL</p>
              <button className='drawer-buton' onClick={() => handleRemoveProduct(product.id)}>Sil</button>
            </div>
          ))}
          <div style={{ marginTop: '20px' }}>
            <p style={{ textAlign: 'center' }}>Toplam Tutar: {totalAmount} TL</p>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;

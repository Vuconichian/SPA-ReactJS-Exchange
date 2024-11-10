import './styles.css';
import logo from './assets/imgs/logo.svg';
import clockIcon from './assets/icons/clock.svg';
import eyeIcon from './assets/icons/eye.svg';
import dollarIcon from './assets/icons/dollar-sign.svg';
import checkIcon from './assets/icons/check-circle.svg';
import React, { useState, useEffect } from 'react';


function App() {
  const [prices, setPrices] = useState({
    BTC: null,
    ETH: null,
    XLM: null,
    USDT: null,
  });
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,stellar,tether');
        const data = await response.json();
        
        // Filtramos los precios de cada criptomoneda
        const priceData = data.data.reduce((acc, coin) => {
          if (coin.id === 'bitcoin') acc.BTC = coin.priceUsd;
          if (coin.id === 'ethereum') acc.ETH = coin.priceUsd;
          if (coin.id === 'stellar') acc.XLM = coin.priceUsd;
          if (coin.id === 'tether') acc.USDT = coin.priceUsd;
          return acc;
        }, {});

        setPrices(priceData); // Actualizamos los precios en el estado
      } catch (error) {
        console.error('Error fetching the prices:', error);
      }
    };

    fetchPrices();

    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString("es-ES", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(formattedTime);
    };

    updateCurrentTime();
    const timeInterval = setInterval(updateCurrentTime, 60000);
  
    return () => clearInterval(timeInterval); // Limpia el intervalo al desmontar
  }, []);
  return (
    <div>
      <header>
        <img src={logo} alt="Logo de Batabit"/>
        <div className="header--title-container">
          <h1>La próxima revolución en el intercambio de criptomonedas</h1>
          <p>Batabit te ayuda a navegar entre los diferentes precios y tendencias.</p>
          <a href="/" className="header--button">
            Conoce Nuestros Planes <span></span>
          </a>
        </div>
      </header>

      <main>
        <section className="main-exchange-container">
          <div className="backgroundImg"></div>
          <div className="main-exchange-container--title">
            <h2>Visibilizamos todas las tasas de cambio.</h2>
            <p>
              Traemos información en tiempo real de las casas de cambio y las monedas más importantes del mundo.
            </p>
          </div>
        </section>

        <section className="main-table-container">
          <div className="main-currency-table">
            <p className="currency-table--title">Monedas:</p>
            <div className="currency-table--container">
              <table>
                <tbody>
                  <tr>
                    <td className="table__top-left">Bitcoin</td>
                    <td className="table__top-right table__right">
                    {prices.BTC ? `$${parseFloat(prices.BTC).toFixed(2)}` : 'Cargando...'}</td>
                  </tr>
                  <tr>
                    <td className="table__top-left">Ethereum</td>
                    <td className="table__right"> {prices.ETH ? `$${parseFloat(prices.ETH).toFixed(2)}` : 'Cargando...'}</td>
                  </tr>
                  <tr>
                    <td className="table__top-left">Stellar</td>
                    <td className="table__right"> {prices.XLM ? `$${parseFloat(prices.XLM).toFixed(2)}` : 'Cargando...'}</td>
                  </tr>
                  <tr>
                    <td className="table__bottom-left">Tether</td>
                    <td className="table__bottom-right table__right"> {prices.USDT ? `$${parseFloat(prices.USDT).toFixed(2)}` : 'Cargando...'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="currency-table--date">
              <p>
                <b>Actualizado:</b>{currentTime}
              </p>
            </div>
          </div>
        </section>

        <section className="main-product-detail">
          <span className="product-detail--batata-logo"></span>
          <div className="product-detail--title">
            <h2>Creamos un producto sin comparación.</h2>
            <p>Confiable y diseñado para su uso diario.</p>
          </div>

          <section className="products-cards-container">
            <article className="product-detail--card">
              <img src={clockIcon} alt="clock" />
              <p className="product--card-title">Tiempo real</p>
              <p className="product--card-body">
                Nuestra API toma información minuto a minuto sobre las tasas que más determinan el comportamiento.
              </p>
            </article>
            <article className="product-detail--card">
              <img src={eyeIcon} alt="eye" />
              <p className="product--card-title">No hay tasas escondidas</p>
              <p className="product--card-body">
                Ni en la compra o al momento de exit, Batabit siempre te muestra el costo real de lo que estás
                adquiriendo.
              </p>
            </article>
            <article className="product-detail--card">
              <img src={dollarIcon} alt="dollar" />
              <p className="product--card-title">Compare monedas</p>
              <p className="product--card-body">
                No más rumores, con Babtabit sabrás el valor real de cada moneda en el mercado actual.
              </p>
            </article>
            <article className="product-detail--card">
              <img src={checkIcon} alt="check" />
              <p className="product--card-title">Información confiable</p>
              <p className="product--card-body">
                Nuestras fuentes están 100% verificadas y continuamos auditando su contenido mientras se actualizan.
              </p>
            </article>
          </section>
        </section>

        <section className="bitcoin-img-container">
          <h2>Conócelo hoy</h2>
        </section>

        <footer></footer>
      </main>
    </div>
  );
}

export default App;
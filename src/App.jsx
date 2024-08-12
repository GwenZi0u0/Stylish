import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { useState } from "react";
import GlobalStyle from "./globalStyles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductsPage from "./pages/ProductPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";

function App() {
  const [items, setItems] = useState(
    localStorage.getItem("formData")
      ? JSON.parse(localStorage.getItem("formData"))
      : []
  );
  const getItems = () => {
    setItems(JSON.parse(localStorage.getItem("formData")));
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header items={items} />
        <Routes>
          <Route
            path="/"
            element={<ProductsPage getItems={getItems} />}
          />
          <Route
            path="/shoppingcart"
            element={<ShoppingCartPage getItems={getItems} />}
          />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;

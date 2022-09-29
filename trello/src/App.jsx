import Columns from "./components/Columns/Columns";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Columns />
      <Footer />
    </div>
  );
};

export default App;

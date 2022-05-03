import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Layout';
import background from './static/bg-masthead.jpg';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className="h-100" style={{ minHeight: "100vh", backgroundImage: `url(${background})`, backgroundSize: "cover"}}>
    <Layout />
  </div>
);

import React from 'react';
import ReactDOM from 'react-dom';
import {SamplerContextStore} from './contexts/SamplerContext';
import App from './components/App/App';

import "@reach/dialog/styles.css";
import "./assets/css/main.scss";

ReactDOM.render(
    <SamplerContextStore>
      <App />
    </SamplerContextStore>,
    document.getElementById('root')
  );


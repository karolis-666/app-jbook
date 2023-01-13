import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

import CellList from './components/CellList';
import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        {/* <TextEditor /> */}
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

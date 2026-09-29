import React from "react";
import ReactDOM from 'react-dom/client';

import app from './app';

const root = ReactDom.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <app />
    </React.StrictMode>
);
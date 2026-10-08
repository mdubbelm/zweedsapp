/**
 * Svenska Kat - Main Entry Point
 * Cleo reist met August door vijf werelden.
 */

import './styles/kat.css';
import { KatApp } from './js/kat/app.js';

document.addEventListener('DOMContentLoaded', () => {
    window.katApp = new KatApp(document.getElementById('app'));
});

import L from 'leaflet';
import * as topojson from 'topojson-client';
import 'leaflet/dist/leaflet.css';
import mapUrl from './world-countries.json?url';
window.L=L;
window.topojson=topojson;
window.SCENARIO_MAP_URL=mapUrl;
import('./scenario-engine.js').then(()=>import('./scenario-app.js'));

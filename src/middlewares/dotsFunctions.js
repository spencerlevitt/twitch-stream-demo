// Import Dots sdk
const Dots = require('dots-node');

// Initialize Dots object
const PRODUCTION = false;
const apiURL = PRODUCTION
?'https://pls.senddots.com/api'
: 'https://pls.senddotssandbox.com/api';

const dots = new Dots(process.env.DOTS_CLIENT_ID, process.env.DOTS_API_KEY, apiURL);
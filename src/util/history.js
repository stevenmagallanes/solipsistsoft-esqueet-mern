//import createHistory from 'history';

const createHistory = require('history').createBrowserHistory;

 export default createHistory({
   basename: process.env.NODE_ENV === 'development' ? '' : '/reactivesearch-auth0-example'
 });
/* SUMMARY: Application functionality controller
 *
 * I generally like to have a controller where all of the 
 * application-level functionality is handled.  Things like
 * authentication, navigation, etc live here.
 */

import LoginComponent from '../components/login.component';

export default class AppController {
    constructor() {
        this.loginComponent = new LoginComponent();
    }

}
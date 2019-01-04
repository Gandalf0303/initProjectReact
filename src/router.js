import Home from './containers/Home';
import Maps from './containers/Maps';
import Register from './containers/Register';
// tab game
import TabGame from './containers/TabGame';
// tab account
import TabAccount from './containers/TabAccount';
import ChangeLanguage from './containers/TabAccount/ChangeLanguage';
import Login from './containers/Login';

export default {
  login: Login,
  home: Home,
  maps: Maps,
  register: Register,
  // tabGame
  tabGame: TabGame,
  // tabAccount
  tabAccount: TabAccount,
  changeLanguage: ChangeLanguage
};

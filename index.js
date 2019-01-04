/** @format */
import { UIManager, StatusBar } from 'react-native';
import { persistStore } from 'redux-persist';
import { Navigation } from 'react-native-navigation';
// import Firebase from 'react-native-firebase';
import { Provider } from 'react-redux';
import I18n from 'react-native-i18n';
import locales from 'Root/src/assets/locales';
import store from 'Root/src/store';
import Routers from 'Root/src/router';
import { buildThemes, colors, fontFamilys } from './src/themes';
import { getIcon } from './src/elements/Icon';

/**
 *  config multi languages
 */
I18n.fallbacks = true;
I18n.translations = locales;

StatusBar.setBarStyle('light-content');
StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor('transparent', true);

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export const supportLanguage = [
  {
    fullCode: 'en_US',
    name: 'English',
    code: 'en'
  },
  {
    code: 'my',
    name: 'Myanmar',
    fullCode: 'my_MM'
  }
];

export const startSingleScreen = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'login',
      navigatorStyle: {
        navBarHidden: true
      }
    },
    appStyle: {
      hideBackButtonTitle: true
    }
  });
};

const navigatorStyle = {
  screenBackgroundColor: '#fff',
  navBarBackgroundColor: colors.orange,
  navBarTitleTextCentered: true,
  // navBarTextFontSize: appThemeConfig.fontScale(20),
  navBarTextFontBold: false,
  navBarTextColor: '#fff',
  topBarElevationShadowEnabled: true,
  navBarNoBorder: false,
  navBarHidden: true,
  // navBarButtonFontSize: appThemeConfig.fontScale(20),
  navBarButtonFontWeight: '500',
  paddingLeft: 0
};

export const startTabBase = passProps => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: I18n.t('home'),
        screen: 'home',
        icon: getIcon('md-home', { fontName: 'Ionicons', fontSize: 24 }),
        navigatorStyle
      },
      {
        label: I18n.t('maps'),
        screen: 'maps',
        icon: getIcon('md-map', {
          fontSize: 24,
          fontName: 'Ionicons'
        }),
        navigatorStyle
      },
      {
        label: I18n.t('games'),
        screen: 'tabGame',
        icon: getIcon('logo-game-controller-b', {
          fontSize: 24,
          fontName: 'Ionicons'
        }),
        navigatorStyle
      },
      {
        label: I18n.t('NAV_ACCOUNT'),
        screen: 'tabAccount',
        icon: getIcon('md-contact', { fontName: 'Ionicons', fontSize: 24 }),
        navigatorStyle
      }
    ],
    tabsStyle: {
      tabBarButtonColor: colors.grey,
      tabBarTextFontFamily: fontFamilys.medium,
      tabBarSelectedButtonColor: colors.orange,
      tabFontSize: 16,
      selectedTabFontSize: 16,
      tabBarBackgroundColor: '#fff',
      initialTabIndex: 0,
      tabBarLabelColor: colors.grey, // iOS only. change the color of tab text
      tabBarSelectedLabelColor: colors.orange,
      navBarHidden: true,
      statusBarBlur: true,
      keepStyleAcrossPush: true
    },
    appStyle: {
      orientation: 'portrait',
      bottomTabBadgeTextColor: 'white',
      bottomTabBadgeBackgroundColor: 'red',
      forceTitlesDisplay: true,
      hideBackButtonTitle: true,
      tabFontFamily: fontFamilys.medium,
      tabFontSize: 12,
      selectedTabFontSize: 14,
      tabBarButtonColor: colors.grey,
      tabBarSelectedButtonColor: colors.orange,
      // navbar
      navBarTextColor: '#fff', // change the text color of the title (remembered across pushes)
      navBarTextFontSize: 18, // appThemeConfig.fontScale(18), // change the font size of the title
      // navBarTextFontFamily: appThemeConfig.fontFamily.semiBold, // Changes the title font
      navBarBackgroundColor: colors.orange,

      navBarTitleTextCentered: true,
      navBarButtonColor: '#FFF',
      navBarLeftButtonColor: '#fff',

      navBarNoBorder: false,
      screenBackgroundColor: '#FFF',
      keepStyleAcrossPush: true,
      navBarHidden: true,
      statusBarColor: 'transparent',
      statusBarBlur: true,
      drawUnderStatusBar: false
    },
    passProps
  });
};

export const registerComponent = (key, component) =>
  Navigation.registerComponent(key, component, store, Provider);

buildThemes();

for (const key in Routers) {
  registerComponent(key, () => Routers[key]);
}

if (!__DEV__) {
  //
}

persistStore(store, null, () => {
  const { auth, locale } = store.getState();
  I18n.locale = locale;

  if (auth.isLogged) {
    // start tab
    startTabBase();
  } else {
    startSingleScreen();
  }
});

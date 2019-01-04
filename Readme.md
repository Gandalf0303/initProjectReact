# Navgation

Sử dụng custom lại bản react-native-navigation chỉnh sửa và fix nhiều bug so với bản gốc

# 1. Top Level API

## Cách sử dụng

```js
import { Navigation } from 'react-native-navigation';
```

## showModal(params = {})

Hiển thị 1 screen giống modal(khuyên dùng không sử dụng)

```js
Navigation.showModal({
  screen: 'example.ModalScreen', // id của screen
  title: 'Modal', // title of the screen as appears in the nav bar (optional)
  passProps: {}, // simple serializable object that will pass as props to the modal (optional)
  navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
  navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
});
```

## dismissModal(params = {})

Tắt modal được hiển thị thời điểm hiện tai.

```js
Navigation.dismissModal({
  animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
});
```

## dismissAllModals(params = {})

Tắt tất cả các modal

```js
Navigation.dismissAllModals({
  animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
});
```

## showLightBox(params = {})

Hiển thị creen như 1 lightbox.

```js
Navigation.showLightBox({
  screen: 'example.LightBoxScreen', // unique ID registered with Navigation.registerScreen
  passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
  style: {
    backgroundBlur: 'dark', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
    backgroundColor: '#ff000080', // tint color for the background, you can specify alpha here (optional)
    tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
  }
});
```

## dismissLightBox()

Dismiss the current lightbox.

```js
Navigation.dismissLightBox();
```

## handleDeepLink(params = {})

Trigger a deep link within the app. See [deep links](https://wix.github.io/react-native-navigation/#/deep-links) for more details about how screens can listen for deep link events.

```js
Navigation.handleDeepLink({
  link: 'link/in/any/format',
  payload: '' // (optional) Extra payload with deep link
});
```

## registerScreen(screenID, generator)

This is an internal function you probably don't want to use directly. If your screen components extend `Screen` directly (`import { Screen } from 'react-native-navigation'`), you can register them directly with `registerScreen` instead of with `registerComponent`. The main benefit of using `registerComponent` is that it wraps your regular screen component with a `Screen` automatically.

```js
Navigation.registerScreen('example.AdvancedScreen', () => AdvancedScreen);
```

## getCurrentlyVisibleScreenId()

In some cases you might need the id of the currently visible screen. This method returns the unique id of the currently visible screen:
`const visibleScreenInstanceId = await Navigation.getCurrentlyVisibleScreenId()`
In order to have any use of this method, you'd need to map instanceId to screens your self.

# 2. Screen API

This API is relevant when in a screen component context - it allows a screen to push other screens, pop screens, change its navigator style, etc. Access to this API is available through the `navigator` object that is passed to your component through `props`.

## push(params)

Push a new screen into this screen's navigation stack.

```js
this.props.navigator.push({
  screen: 'example.ScreenThree', // unique ID registered with Navigation.registerScreen
  title: undefined, // navigation bar title of the pushed screen (optional)
  subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
  titleImage: require('../../img/my_image.png'), // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
  passProps: {}, // Object that will be passed as props to the pushed screen (optional)
  animated: true, // does the push have transition animation or does it happen immediately (optional)
  animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
  backButtonTitle: undefined, // override the back button title (optional)
  backButtonHidden: false, // hide the back button altogether (optional)
  navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
  navigatorButtons: {}, // override the nav buttons for the pushed screen (optional)
  // enable peek and pop - commited screen will have `isPreview` prop set as true.
  previewView: undefined, // react ref or node id (optional)
  previewHeight: undefined, // set preview height, defaults to full height (optional)
  previewCommit: true, // commit to push preview controller to the navigation stack (optional)
  previewActions: [
    {
      // action presses can be detected with the `PreviewActionPress` event on the commited screen.
      id: '', // action id (required)
      title: '', // action title (required)
      style: undefined, // 'selected' or 'destructive' (optional)
      actions: [] // list of sub-actions
    }
  ]
});
```

## pop(params = {})

Pop the top screen from this screen's navigation stack.

```js
this.props.navigator.pop({
  animated: true, // does the pop have transition animation or does it happen immediately (optional)
  animationType: 'fade' // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
});
```

## popToRoot(params = {})

Pop all the screens until the root from this screen's navigation stack.

```js
this.props.navigator.popToRoot({
  animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
  animationType: 'fade' // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
});
```

## resetTo(params)

Reset the screen's navigation stack to a new screen (the stack root is changed).

```js
this.props.navigator.resetTo({
  screen: 'example.ScreenThree', // unique ID registered with Navigation.registerScreen
  title: undefined, // navigation bar title of the pushed screen (optional)
  passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
  animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
  animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
  navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
  navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
});
```

## showModal(params = {})

Show a screen as a modal.

```js
this.props.navigator.showModal({
  screen: 'example.ModalScreen', // unique ID registered with Navigation.registerScreen
  title: 'Modal', // title of the screen as appears in the nav bar (optional)
  passProps: {}, // simple serializable object that will pass as props to the modal (optional)
  navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
  animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
});
```

## dismissModal(params = {})

Dismiss the current modal.

```js
this.props.navigator.dismissModal({
  animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
});
```

## dismissAllModals(params = {})

Dismiss all the current modals at the same time.

```js
this.props.navigator.dismissAllModals({
  animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
});
```

## showLightBox(params = {})

Show a screen as a lightbox.

```js
this.props.navigator.showLightBox({
  screen: 'example.LightBoxScreen', // unique ID registered with Navigation.registerScreen
  passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
  style: {
    backgroundBlur: 'dark', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
    backgroundColor: '#ff000080', // tint color for the background, you can specify alpha here (optional)
    tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
  },
  adjustSoftInput: 'resize' // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
});
```

## dismissLightBox()

Dismiss the current lightbox.

```js
this.props.navigator.dismissLightBox();
```

## showInAppNotification(params = {})

Show in-app notification. This generally looks like a pop-up window that can appear at the top of the screen.

```js
this.props.navigator.showInAppNotification({
  screen: 'example.InAppNotification', // unique ID registered with Navigation.registerScreen
  passProps: {}, // simple serializable object that will pass as props to the in-app notification (optional)
  autoDismissTimerSec: 1 // auto dismiss notification in seconds
});
```

## handleDeepLink(params = {})

Trigger a deep link within the app. See [deep links](https://wix.github.io/react-native-navigation/#/deep-links) for more details about how screens can listen for deep link events.

```js
this.props.navigator.handleDeepLink({
  link: 'chats/2349823023' // the link string (required)
});
```

> `handleDeepLink` can also be called statically:

```js
  import {Navigation} from 'react-native-navigation';
  Navigation.handleDeepLink(...);
```

## setButtons(params = {})

Set buttons dynamically on the navigator. If your buttons don't change during runtime, see "Adding buttons to the navigator" below to add them using `static navigatorButtons = {...};`.

```js
this.props.navigator.setButtons({
  leftButtons: [], // see "Adding buttons to the navigator" below for format (optional)
  rightButtons: [], // see "Adding buttons to the navigator" below for format (optional)
  animated: true // does the change have transition animation or does it happen immediately (optional)
});
```

## setTitle(params = {})

Set the nav bar title dynamically. If your title doesn't change during runtime, set it when the screen is defined / pushed.

```js
this.props.navigator.setTitle({
  title: 'Dynamic Title' // the new title of the screen as appears in the nav bar
});
```

## setSubTitle(params = {})

Set the nav bar subtitle dynamically. If your subtitle doesn't change during runtime, set it when the screen is defined / pushed.

```js
this.props.navigator.setSubTitle({
  subtitle: 'Connecting...'
});
```

## toggleDrawer(params = {})

Toggle the side menu drawer assuming you have one in your app.

```js
this.props.navigator.toggleDrawer({
  side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
  animated: true, // does the toggle have transition animation or does it happen immediately (optional)
  to: 'open' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
});
```

## setDrawerEnabled(params = {})

Enables or disables the side menu drawer assuming you have one in your app. Both drawers are enabled by default.

```js
this.props.navigator.setDrawerEnabled({
  side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
  enabled: false // should the drawer be enabled or disabled (locked closed)
});
```

## toggleTabs(params = {})

Toggle whether the tabs are displayed or not (only in tab-based apps).

```js
this.props.navigator.toggleTabs({
  to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
  animated: true // does the toggle have transition animation or does it happen immediately (optional)
});
```

## setTabBadge(params = {})

Set the badge on a tab (any string or numeric value).

```js
this.props.navigator.setTabBadge({
  tabIndex: 0, // (optional) if missing, the badge will be added to this screen's tab
  badge: 17, // badge value, null to remove badge
  badgeColor: '#006400' // (optional) if missing, the badge will use the default color
});
```

## setTabButton(params = {})

Change the tab icon on a bottom tab.

```js
this.props.navigator.setTabButton({
  tabIndex: 0, // (optional) if missing, the icon will be added to this screen's tab
  icon: require('../img/one.png'), // local image asset for the tab icon unselected state (optional)
  selectedIcon: require('../img/one_selected.png'), // local image asset for the tab icon selected state (optional, iOS only)
  label: 'New Label' // tab label that appears under the icon (optional)
});
```

## switchToTab(params = {})

Switch to a tab (sets it as the currently selected tab).

```js
this.props.navigator.switchToTab({
  tabIndex: 0 // (optional) if missing, this screen's tab will become selected
});
```

## toggleNavBar(params = {})

Toggle whether the navigation bar is displayed or not.

```js
this.props.navigator.toggleNavBar({
  to: 'hidden', // required, 'hidden' = hide navigation bar, 'shown' = show navigation bar
  animated: true // does the toggle have transition animation or does it happen immediately (optional). By default animated: true
});
```

## setOnNavigatorEvent(callback)

Set a handler for navigator events (like nav button press). This would normally go in your component constructor.
Can not be used in conjuction with `addOnNavigatorEvent`.

```js
// this.onNavigatorEvent will be our handler
this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
```

## addOnNavigatorEvent(callback)

Add a handler for navigator events (like nav button press). This would normally go in your component constructor.
If you choose to use `addOnNavigatorEvent` instead of `setOnNavigatorEvent` you will be able to add multiple handlers.
Bear in mind that you can't use both `addOnNavigatorEvent` and `setOnNavigatorEvent`.
`addOnNavigatorEvent` returns a function, that once called will remove the registered handler.

# Screen Visibility

`const isVisible = await this.props.navigator.screenIsCurrentlyVisible()`

## Listen visibility events in onNavigatorEvent handler

```js
export default class ExampleScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        break;
      case 'didAppear':
        break;
      case 'willDisappear':
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }
}
```

## Listen to visibility events globally

```js
import { ScreenVisibilityListener as RNNScreenVisibilityListener } from 'react-native-navigation';

export class ScreenVisibilityListener {
  constructor() {
    this.listener = new RNNScreenVisibilityListener({
      didAppear: ({ screen, startTime, endTime, commandType }) => {
        console.log(
          'screenVisibility',
          `Screen ${screen} displayed in ${endTime -
            startTime} millis after [${commandType}]`
        );
      }
    });
  }

  register() {
    this.listener.register();
  }

  unregister() {
    if (this.listener) {
      this.listener.unregister();
      this.listener = null;
    }
  }
}
```

# Listening to tab selected events

In order to listen to `bottomTabSelected` event, set an `onNavigatorEventListener` on screens that are pushed to BottomTab. The event is dispatched to the top most screen pushed to the selected tab's stack.

```js
export default class ExampleScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      console.log('Tab reselected!');
    }
  }
}
```

# Peek and pop (3D touch)

react-native-navigation supports the [Peek and pop](https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/Adopting3DTouchOniPhone/#//apple_ref/doc/uid/TP40016543-CH1-SW3) feature by setting a react view reference as a `previewView` parameter when doing a push, more options are available in the `push` section.

You can define actions and listen for interactions on the pushed screen with the `PreviewActionPress` event.

Previewed screens will have the prop `isPreview` that can be used to render different things when the screen is in the "Peek" state and will then recieve a navigator event of `willCommitPreview` when in the "Pop" state.

# 3. Style sử dụng themes

Tư tưởng xây dựng theo bootStrap của web và lib classnames,
Nhiều quá, xem thêm ở thư mục @viettel/theme `fn và styles`

# React Native bootstrap

## styles

1.  Flexbox
  a. Static

| prefix          | detail                                | note |
| --------------- | ------------------------------------- | ---- |
| flx-i           | `{ flex : 1 }`                        |      |
| flx-grow        | `{ flexGrow: 1 }`                     |
| flx-row         | `{ flexDirection: 'row' }`            |
| flx-row-reverse | `{ flexDirection: 'row-reverse' }`    |
| flx-col-reverse | `{ flexDirection: 'column-reverse' }` |
| flx-wrap        | `{ flexWrap: 'wrap' }`                |
| aifs            | `{ alignItems: 'flex-start' }`        |
| aic             | `{ alignItems: 'center' }`            |
| aife            | `{ alignItems: 'flex-end' }`          |
| asfs            | `{ alignSelf: 'flex-start' }`         |
| asc             | `{ alignSelf: 'center' }`             |
| asfe            | `{ alignSelf: 'flex-end' }`           |
| ass             | `{ alignSelf: 'stretch' }`            |
| jcfs            | `{ justifyContent: 'flex-start' }`    |
| jcc             | `{ justifyContent: 'center' }`        |
| jcfe            | `{ justifyContent: 'flex-end' }`      |
| jcsb            | `{ justifyContent: 'space-between' }` |
| jcsa            | `{ justifyContent: 'space-around' }`  |

  b. Dyamic
  `flex-number` ví dụ: `flex-3 ` => ` { flex : 3} `

2.  absolute

| prefix       | detail                                    | note |
| ------------ | ----------------------------------------- | ---- |
| absolute     | `{ position: 'absolute' }`                |      |
| fullParent   | `{ top: 0, left: 0, right: 0, bottom: 0}` |
| absoluteFill | `StyleSheet.absoluteFillObject`           |

3.  border

| prefix | detail                                            | note |
| ------ | ------------------------------------------------- | ---- |
| bhl    | `{borderWidth: StyleSheet.hairlineWidth }`        |      |
| bthl   | `{ borderTopWidth: StyleSheet.hairlineWidth }`    |
| brhl   | `{ borderRightWidth: StyleSheet.hairlineWidth }`  |
| blhl   | `{ borderLeftWidth: StyleSheet.hairlineWidth }`   |
| bbhl   | `{ borderBottomWidth: StyleSheet.hairlineWidth }` |

3.  fontWeigth

| prefix | detail                    | note |
| ------ | ------------------------- | ---- |
| nomal  | `{ fontWeight: 'nomal' }` |      |
| fw1    | `{ fontWeight: '100' }`   |
| fw2    | `{ fontWeight: '200' }`   |
| fw3    | `{ fontWeight: '300' }`   |
| fw4    | `{ fontWeight: '400' }`   |
| fw5    | `{ fontWeight: '500' }`   |
| fw6    | `{ fontWeight: '600' }`   |
| fw7    | `{ fontWeight: '700' }`   |
| fw8    | `{ fontWeight: '800' }`   |
| fw9    | `{ fontWeight: '900' }`   |


# Maintainer

## Thanh Pham

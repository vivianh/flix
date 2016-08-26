import React from 'react';
import {
  Navigator,
  BackAndroid,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  NetInfo,
} from 'react-native';
import MovieDetailsView from './MovieDetailsView.react';
import TabBar from './TabBar.react';

const styles = StyleSheet.create({
  scene: {
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
  },
  navBar: {
    backgroundColor: 'orange',
  },
  text: {
    color: 'white',
  },
});

const routes = [
  { name: 'MoviesView' },
  { name: 'MovieDetailsView' },
];

const routeMapper = {
  LeftButton: (route, navigator) => {
    if (route.name == 'MovieDetailsView') {
      return (
        <TouchableOpacity onPress={() => navigator.pop()}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      );
    }
    return null;
  },
  RightButton: () => null,
  Title: () => <Text style={styles.text}>flix</Text>,
};

class NavApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: true,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    NetInfo.addEventListener(
      'change',
      this._handleConnectionChange,
    );
    NetInfo.fetch().done(
      (connectionInfo) => {
        if (connectionInfo == 'none' || connectionInfo == 'unknown') {
          this.setState({ showError: true });
        }
      }
    );
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    NetInfo.removeEventListener(
      'change',
      this._handleConnectionChange,
    );
  }

  _handleConnectionChange = (connectionInfo) => {
    if (connectionInfo == 'none' || connectionInfo == 'unknown') {
      this.setState({ showError: true });
    } else {
      this.setState({ showError: false });
    }
  }

  onBackAndroid = () => {
    if (this.navBackAndroid && this.navBackAndroid.getCurrentRoutes().length > 1) {
      this.navBackAndroid.pop();
      return true;
    }
    return false;
  }

  navBackAndroid = null;

  render() {
    const renderScene = (route, navigator) => {
      this.navBackAndroid = navigator;

      if (route.name == 'MoviesView') {
        return (
          <TabBar
            currentTab="now_playing"
            navigator={navigator}
            showError={this.state.showError}
          />
        );
      } else if (route.name == 'MovieDetailsView') {
        return (
          <MovieDetailsView
            navigator={navigator}
            movie={route.movie}
            posterUri={route.posterUri}
            backdropUri={route.backdropUri}
          />
        );
      }
    };

    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={renderScene}
        style={styles.scene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={routeMapper}
            style={styles.navBar}
          />
        }
      >
    </Navigator>
    );
  }
}

export default NavApp;

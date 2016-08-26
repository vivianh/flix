import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
// import NavApp from './NavApp.react';
import MoviesView from './MoviesView.react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  tabBarText: {
    // color: 'white',
    color: 'rgba(255, 255, 255, 0.36)',
  },
});

class TabBar extends React.Component {
  /*
  state = {
    currentTab: 'now_playing',
  }
  */
  constructor(props) {
    super(props);

    this.state = {
      currentTab: this.props.currentTab,
    };
  }

  renderTabBar = () => {
    const selectedStyle = tabName => {
      if (tabName !== this.state.currentTab) {
        return { color: 'rgba(255, 255, 255, 0.36)' };
      } else {
        return { color: 'white' };
      }
    };

    return (
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => this.setState({ currentTab: 'now_playing' })}
        >
          <Text style={[styles.tabBarText, selectedStyle('now_playing')]}>
            Now Playing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({ currentTab: 'top_rated' })}
        >
          <Text style={[styles.tabBarText, selectedStyle('top_rated')]}>
            Top Rated
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderScene = () => {
    return (
      <View style={styles.scene}>
        <MoviesView
          currentTab={this.state.currentTab}
          navigator={this.props.navigator}
          showError={this.props.showError}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTabBar()}
        {this.renderScene()}
      </View>
    );
  }
}

TabBar.propTypes = {
  currentTab: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  showError: PropTypes.bool.isRequired,
};

export default TabBar;

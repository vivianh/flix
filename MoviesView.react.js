import React , { PropTypes } from 'react';
import {
  ListView,
  ActivityIndicator,
  RefreshControl,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MovieCellView from './MovieCellView.react';
import { fetchMovies } from './api';

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: 'center',
    backgroundColor: 'red',
  },
  errorText: {
    color: 'white',
    padding: 10,
  },
});

class MoviesView extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds,
      loading: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    this._fetchMovies(this.props.currentTab);
  }

  componentWillReceiveProps(nextProps) {
    this._fetchMovies(nextProps.currentTab);
  }

  _fetchMovies = (currentTab) => {
    fetchMovies(currentTab)
      .then(movies => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(movies),
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        console.log(error.msg); //eslint-disable-line
      });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    fetchMovies(this.props.currentTab)
      .then(movies => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(movies),
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({
          refreshing: false,
        });
        console.log(error.msg); //eslint-disable-line
      });
  }

  renderRow = (movie) => {
    return (
      <MovieCellView
        movie={movie}
        navigator={this.props.navigator}
      />
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          animating={true}
          size={"large"}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {
          this.props.showError &&
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Network Error
            </Text>
          </View>
        }
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              enabled={true}
            />
          }
        />
      </View>
    );
  }
}

MoviesView.propTypes = {
  currentTab: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  showError: PropTypes.bool.isRequired,
};

export default MoviesView;

import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
    // borderWidth: 3,
    // borderColor: 'rgb(66, 172, 22)',
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  image: {
    resizeMode: 'cover',
    // width: 200,
    // height: 400,
    // borderWidth: 3,
    // borderColor: 'rgb(66, 172, 22)',
  },
  text: {
    fontSize: 12,
    // borderWidth: 3,
    // borderColor: 'rgb(66, 172, 22)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // borderWidth: 3,
    // borderColor: 'rgb(66, 172, 22)',
  },
});

class MovieDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }

  render() {
    const { movie, posterUri, backdropUri } = this.props;
    const imageSource = posterUri === null ? backdropUri : posterUri;
    const measureView = (event) => {
      var {x, y, width, height} = event.nativeEvent.layout;
      this.setState({
        x: x,
        y: y,
        width: width,
        height: height,
      });
    };

    const containerStyle = () => {
      if (this.state.width > (this.state.height + 100)) {
        return { flexDirection: 'row' };
      } else {
        return { flexDirection: 'column' };
      }
    };

    const imageStyle = () => {
      if (this.state.width > this.state.height) {
        return {
          width: 300,
          height: this.state.height,
        };
      } else {
        return {
          width: this.state.width,
          height: 400,
        };
      }
    };

    return (
      <View
        style={[styles.container, containerStyle()]}
        onLayout={(event) => measureView(event)}
      >
        <Image
          style={[styles.image, imageStyle()]}
          source={{ uri: imageSource }}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.title]}>{movie.title}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
      </View>
    );
  }
}

MovieDetailsView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
  }).isRequired,
  posterUri: PropTypes.string.isRequired,
  backdropUri: PropTypes.string.isRequired,
};

export default MovieDetailsView;

import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const imageURIPrefix = 'https://image.tmdb.org/t/p/original';
const getPosterURI = movie => `${imageURIPrefix}${movie.poster_path}`;
const getBackdropURI = movie => `${imageURIPrefix}${movie.backdrop_path}`;

const styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
    paddingLeft: 0,
    flexDirection: 'row',
  },
  image: {
    height: 120,
    width: 100,
  },
  textContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    color: 'rgb(57, 57, 57)',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

class MovieCellView extends React.Component {
  render() {
    const { movie, navigator } = this.props;
    const moviePosterURI = getPosterURI(movie);
    const onPress = () => {
      navigator.push({
        name: 'MovieDetailsView',
        movie: movie,
        posterUri: moviePosterURI,
        backdropUri: getBackdropURI(movie),
      });
    };

    return (
      <TouchableOpacity
        onPress={onPress}
      >
        <View style={styles.rowContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: moviePosterURI }}
          />
          <View style={styles.textContainer}>
            <Text
              style={[styles.text, styles.title]}
              numberOfLines={1}
            >
              {movie.title}
            </Text>
            <Text
              style={styles.text}
              numberOfLines={3}
            >
              {movie.overview}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

MovieCellView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
  }).isRequired,
  navigator: PropTypes.object.isRequired,
};

export default MovieCellView;

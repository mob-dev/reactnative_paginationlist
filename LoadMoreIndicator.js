/**
 * Component to show load more indicator on list use in PaginationList index.
 */

import React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import * as FontWeight from '~/constants/FontWeight';
import * as Colors from '~/constants/Colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  loadMoreContainer: {
    height: 40,
    width,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  loadMoreText: {
    alignSelf: 'center',
    color: Colors.homeFooterText,
    fontFamily: 'sans-serif',
    fontWeight: FontWeight.regular,
    fontSize: 16,
  },
});

const LoadMoreIndicator = props => (props.isLoading ? <RenderFooterLoader /> : null);

const RenderFooterLoader = () => (
  <View style={styles.loadMoreContainer} >
    <ActivityIndicator animating size="large" />
  </View>
);

LoadMoreIndicator.defaultProps = {
  isLoading: false,
};

LoadMoreIndicator.propTypes = {
  isLoading: PropTypes.bool,
};

export default LoadMoreIndicator;

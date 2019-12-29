/**
 * Component use to show list with pagination and reload page. 
 */

import React, { Component } from 'react';
import {
  FlatList,
  RefreshControl,
} from 'react-native';
import { withState } from 'recompose';
import _ from 'lodash';
import PropTypes from 'prop-types';
import LoadMore from './LoadMore';

// Using withState for React state management
@withState('pageCount', 'setPageCount', 1)
@withState('isPullToRefresh', 'setPullToRefresh', false)
@withState('needLoadMore', 'setNeedLoadMore', true)
@withState('isLoadMore', 'setLoadMore', false)
class PagelessList extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedPageCount !== 0) {
      this.props.setPageCount(nextProps.updatedPageCount);
    }
    if (this.props.toggleNeedLoadMore && this.props.needLoadMore) {
      this.props.setNeedLoadMore(false);
    }
    if (this.props.minimumLoadMoreSize !== -1) {
      const isNeedLoad = this.props.list.length >= this.props.minimumLoadMoreSize;
      if ((isNeedLoad && !this.props.needLoadMore) || (!isNeedLoad && this.props.needLoadMore)) {
        this.props.setNeedLoadMore(isNeedLoad);
      }
    }
  }

  handleEvent(pageCount, isRefresh = false) {
    if (this.props.isLoading) { return; }
    this.props.setPullToRefresh(isRefresh);
    this.props.setLoadMore(!isRefresh);
    this.props.setPageCount(pageCount);
    this.props.fetchList(pageCount);
  }
  
  render() {
    return (
      <FlatList
        ref={ref => { if (!_.isEmpty(this.props.setListRef)) {
          this.props.setListRef(ref)
         }}}
        data={this.props.list}
        extraData={this.props}
        renderItem={item => this.props.renderItem(item)}
        keyExtractor={item => String(_.get(item, 'id'))}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isPullToRefresh && this.props.isLoading}
            onRefresh={() => this.handleEvent(1, true)}
          />
        }
        ListFooterComponent={() => <LoadMore isLoading={this.props.isLoadMore && this.props.isLoading} />}
        onEndReachedThreshold={0.1}
        onEndReached={() => this.props.needLoadMore &&
          this.handleEvent(this.props.pageCount + 1)
        }
      />
    );
  }
}

PagelessList.defaultProps = {
  isLoading: false,
  list: [],
  renderItem: _.noop,
  fetchList: _.noop,
  updatedPageCount: 0,
  minimumLoadMoreSize: -1,
  toggleNeedLoadMore: false,
  pageCount: 1,
  isPullToRefresh: false,
  isLoadMore: false,
  needLoadMore: false,
  setPageCount: _.noop,
  setPullToRefresh: _.noop,
  setLoadMore: _.noop,
  setNeedLoadMore: _.noop,
};

PagelessList.propTypes = {
  isLoading: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.any),
  renderItem: PropTypes.func,
  fetchList: PropTypes.func,
  updatedPageCount: PropTypes.number,
  minimumLoadMoreSize: PropTypes.number,
  toggleNeedLoadMore: PropTypes.bool,
  pageCount: PropTypes.number,
  isPullToRefresh: PropTypes.bool,
  isLoadMore: PropTypes.bool,
  needLoadMore: PropTypes.bool,
  setPageCount: PropTypes.func,
  setPullToRefresh: PropTypes.func,
  setLoadMore: PropTypes.func,
  setNeedLoadMore: PropTypes.func,
};

export default PagelessList;

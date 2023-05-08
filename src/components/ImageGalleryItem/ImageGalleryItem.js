import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css'

import Modal from 'components/Modal/Modal';
import { Controls } from 'components/Controls/Controls';


class ImageGalleryItem extends Component {
  state = {
    shownModal: false,
    index: this.props.index,
  };

  onModal = () => {
    this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
  };

  changeIndex = value => {
    this.setState(state => ({ index: state.index + value }));
    
  };

  render() {
    const { image, images } = this.props;
    const { index } = this.state;
    const totalItems = images.length;
    const currentItem = images[index];
    
   
    return (
      <li onClick={this.onModal} className={css.gallery_item}>
        <img
          className={css.gallery_item_img}
          src={image.webformatURL}
          alt="img"
        />
        {this.state.shownModal && <Modal onClose={this.onModal}>
          <img src={currentItem.largeImageURL} alt="img" />
          <Controls
          current={index + 1}
          total={totalItems}
          onChange={this.changeIndex}/>
        </Modal>}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
};

export default ImageGalleryItem;


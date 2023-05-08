import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css'

import Modal from 'components/Modal/Modal'

class ImageGalleryItem extends Component {
  state = {
    shownModal: false,
  };

  onModal = () => {
    this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
  };

  render() {
    const { image } = this.props;
    
    return (
      <li onClick={this.onModal} className={css.gallery_item}>
        <img
          
          className={css.gallery_item_img}
          src={image.webformatURL}
          alt="img"
        />
        {this.state.shownModal && <Modal onClose={this.onModal}>
          <img src={image.largeImageURL} alt="img" />
        </Modal>}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
};

export default ImageGalleryItem;
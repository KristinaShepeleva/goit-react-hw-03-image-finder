import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from 'components/ImageGallery/ImageGallery.module.css'


function ImageGallery({ images }) {
 
  return (
    <>
      <ul className={css.image_list}>
        {images.map((image, index, images) => (
          <ImageGalleryItem key={image.id} image={image} images={images} index={index} />
        ))}
      </ul>
    </>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array,
};
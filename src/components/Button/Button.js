import PropTypes from 'prop-types';
import css from 'components/Button/Button.module.css'

const Button = ({ onClick }) => {
  return (
    <button className={css.button_load__more} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
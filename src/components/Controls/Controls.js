import css from 'components/Controls/Controls.module.css';

export const Controls = ({ current, total, onChange }) => {
    
  return (
    <div className={css.controls}>
      <button className={css.button_controls}
        type="button"
        disabled={current === 1}
        onClick={() => onChange(-1)}
      >
        Back 
      </button>
      <button className={css.button_controls}
        type="button"
        disabled={current === total}
        onClick={() => onChange(+1)}
      >
        Next
      </button>
    </div>
  );
};
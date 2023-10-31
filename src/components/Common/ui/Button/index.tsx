import styles from './styles.module.scss';

type ButtonProps = {
  text: string;
  borderColor?: string;
  textColor?: string;
  backgroundColor?: string;
  disabled?: boolean;
  onClick: () => void;
};

export default function Button({
  text,
  borderColor,
  textColor,
  backgroundColor,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={disabled ? styles.disabledButton : styles.button}
      style={{
        borderColor: borderColor || 'black',
        backgroundColor: backgroundColor || 'transparent',
        color: textColor || 'black',
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

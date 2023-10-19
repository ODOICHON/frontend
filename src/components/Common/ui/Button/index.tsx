import styles from './styles.module.scss';

type ButtonProps = {
  text: string;
  borderColor?: string;
  textColor?: string;
  backgroundColor?: string;
  onClick: () => void;
};

export default function Button({
  text,
  borderColor,
  textColor,
  backgroundColor,
  onClick,
}: ButtonProps) {
  console.log(text);
  return (
    <button
      type="button"
      className={styles.button}
      style={{
        borderColor: borderColor || 'black',
        backgroundColor: backgroundColor || 'transparent',
        color: textColor || 'black',
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

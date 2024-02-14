import { BsBookmark } from 'react-icons/bs';

type BookmarkIconProps = {
  color?: string;
  size?: string;
};

function BookmarkIcon({ color, size }: BookmarkIconProps) {
  return <BsBookmark color={color} size={size} />;
}

export default BookmarkIcon;

import { BsBookmarkFill } from 'react-icons/bs';

type BookmarkFillIconProps = {
  color?: string;
  size?: string;
};

function BookmarkFillIcon({ color, size }: BookmarkFillIconProps) {
  return <BsBookmarkFill color={color} size={size} />;
}

export default BookmarkFillIcon;

import { BoardContent } from '@/types/boardType';

export default function ReviewBoard(props: BoardContent) {
  return (
    <div>
      <img src={props.imageUrl} />
      <h3>{props.title}</h3>
      <p>{props.oneLineContent}</p>
    </div>
  );
}

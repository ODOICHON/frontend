import { BoardContent } from '@/types/boardType';

export default function TrendBoard(props: BoardContent) {
  return (
    <div style={{ backgroundImage: `url(${props.imageUrl})` }}>
      <h1>{props.title}</h1>
    </div>
  );
}

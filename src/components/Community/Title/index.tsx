import { CommunityBoardDetailType } from '@/types/Board/communityType';

type TitleProps = {
  category: string | undefined;
  boardData: CommunityBoardDetailType | null;
};

export default function Title({ category, boardData }: TitleProps) {
  const title = category === 'free_board' ? '자유게시판' : '홍보게시판';

  return <h1>{boardData ? `${title} 수정하기` : `${title} 글쓰기`}</h1>;
}

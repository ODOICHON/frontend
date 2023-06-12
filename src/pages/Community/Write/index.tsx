import { Navigate, useParams } from 'react-router-dom';
import CommunityQuill from '@/components/Community/Quill';

function CommunityWritePage() {
  const { category } = useParams();

  if (category !== 'free_board' && category !== 'advertisement_board')
    return <Navigate to="/community/free_board" />;

  return <CommunityQuill queryParam={category} />;
}

export default CommunityWritePage;

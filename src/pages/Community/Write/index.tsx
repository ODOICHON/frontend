import { Navigate, useParams } from 'react-router-dom';
import CommunityQuill from '@/components/Community/Quill';
import userStore from '@/store/userStore';

function CommunityWritePage() {
  const { category } = useParams();
  const { token } = userStore();

  if (!token) return <Navigate to="/login" />;

  if (category !== 'free_board' && category !== 'advertisement_board')
    return <Navigate to="/community/free_board" />;

  return <CommunityQuill queryParam={category} />;
}

export default CommunityWritePage;

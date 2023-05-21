import { Navigate, useParams } from 'react-router-dom';
import CommunityQuill from '@/components/Community/Quill';
import userStore from '@/store/userStore';

function CommunityWritePage() {
  const { category } = useParams();
  const { token } = userStore();
  if (category !== 'free_board' && category !== 'advertisement_board')
    return <Navigate to="/community/free_board" />;

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <CommunityQuill queryParam={category} />;
}

export default CommunityWritePage;

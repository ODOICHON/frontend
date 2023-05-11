import { Navigate, useParams } from 'react-router-dom';
import CommunityQuill from '@/components/Community/Quill';
import userStore from '@/store/userStore';

function CommunityWritePage() {
  const { category } = useParams();
  const { token } = userStore();

  if (!token) {
    alert(`로그인을 해주세요! ${category}`);
    return <Navigate to="/login" />;
  }
  return <CommunityQuill queryParam={category} />;
}

export default CommunityWritePage;

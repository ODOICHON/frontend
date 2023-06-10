import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import IntroduceQuill from '@/components/Introduce/Quill';
import userStore from '@/store/userStore';

export default function IntroduceWritePage() {
  const { user } = userStore();

  if (user?.authority !== 'ADMIN') {
    alert('권한이 없습니다');
    return <Navigate to="/introduce" />;
  }
  return <IntroduceQuill />;
}

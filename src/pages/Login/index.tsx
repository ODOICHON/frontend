import removeImg from '@/assets/common/remove.png';
import { opacityVariants } from '@/constants/variants';
import useInput from '@/hooks/useInput';
import { motion } from 'framer-motion';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { LoginAPI, LoginForm } from '@/apis/login';
import userStore from '@/store/userStore';

export default function LoginPage() {
  const { token, setToken } = userStore();
  const navigate = useNavigate();
  const [id, handleId, setId] = useInput('');
  const [password, handlePassword, setPassword] = useInput('');
  const handleRemove = (e: React.SyntheticEvent) => {
    if (e.currentTarget.parentElement?.id === 'idContainer') setId('');
    if (e.currentTarget.parentElement?.id === 'passwordContainer')
      setPassword('');
    else return;
  };
  const handleLogin = async () => {
    const form: LoginForm = {
      email: id,
      password,
    };
    const response = await LoginAPI(form);
    if (response?.code === 'SUCCESS') {
      const token: Token = {
        access_token: response?.data.access_token,
      };
      setToken(token);
      navigate('/');
    }
  };
  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.currentTarget.value.length !== 0 &&
      e.key === 'Enter' &&
      !e.shiftKey &&
      e.nativeEvent.isComposing === false
    ) {
      e.preventDefault();
      handleLogin();
    }
  };
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      <div className={styles.title}>로그인</div>
      <div className={styles.contents}>
        <div id="idContainer" className={styles.inputContainer}>
          <input
            className={styles.inputBox}
            type="text"
            value={id}
            onChange={handleId}
            placeholder="아이디"
          />
          {id !== '' && (
            <img
              className={styles.removeImg}
              src={removeImg}
              onClick={handleRemove}
            />
          )}
        </div>
        <div id="passwordContainer" className={styles.inputContainer}>
          <input
            className={styles.inputBox}
            type="password"
            value={password}
            onKeyDown={onKeydown}
            onChange={handlePassword}
            placeholder="비밀번호"
          />
          {password !== '' && (
            <img
              className={styles.removeImg}
              src={removeImg}
              onClick={handleRemove}
            />
          )}
        </div>
        <button className={styles.loginButton} onClick={handleLogin}>
          로그인
        </button>
        <span className={styles.subContainer}>
          <p>회원으로 가입하고 싶으신가요?</p>
          <Link to="/signup">회원가입</Link>
        </span>
      </div>
    </motion.div>
  );
}

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import { updateNicknameAPI } from '@/apis/user';
import useCheckAPI from '@/hooks/useCheckAPI';
import { EditMode } from '@/constants/myPage';
import styles from './styles.module.scss';

type EditNicknameInfoProps = {
  currentNickname: string;
  setEditMode: React.Dispatch<React.SetStateAction<EditMode>>;
};

type Form = {
  nick_name: string;
};

export default function EditNicknameInfo({
  currentNickname,
  setEditMode,
}: EditNicknameInfoProps) {
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    mode: 'onSubmit',
    defaultValues: {
      nick_name: currentNickname,
    },
  });
  const { mutate: nicknameCheckAPI } = useMutation((nick_name: string) =>
    restFetcher({
      method: 'POST',
      path: '/users/check/nick-name',
      body: { nick_name },
    }),
  );
  const onChangeInput = (
    setCheckState: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    feild: string,
  ) => {
    setCheckState(false);
    setMessage(`${feild} 중복검사를 해주세요`);
  };
  const [
    nicknameCheck,
    nicknameCheckMessage,
    nicknameCheckHandler,
    setNicknameCheck,
    setNicknameCheckMessage,
  ] = useCheckAPI(
    nicknameCheckAPI,
    /^(?=.*[a-zA-Z0-9가-힣])[A-Za-z0-9가-힣]{1,20}$/g,
    watch('nick_name'),
    '사용가능한 닉네임입니다.',
    '이미 존재하는 닉네임 입니다.',
    '닉네임 형식에 맞지 않습니다.',
  );

  const onUpdateNickname = async (data: Form) => {
    try {
      await updateNicknameAPI(data.nick_name);
      queryClient.refetchQueries([QueryKeys.USER]);
      setEditMode('none');
    } catch (err) {
      // TODO: 공용 모달로 띄워주기
      alert('닉네임 변경에 실패했습니다.');
    }
  };

  useEffect(() => {
    onChangeInput(setNicknameCheck, setNicknameCheckMessage, '닉네임');
  }, [watch('nick_name')]);
  return (
    <li className={styles.wrapper}>
      <p>닉네임</p>
      <div className={styles.inputContainer}>
        <div>
          <input
            className={styles.inputStyle}
            id="nick_name"
            type="text"
            placeholder="20자 이하의 조합"
            {...register('nick_name', {
              required: '닉네임은 필수 입력입니다.',
              pattern: {
                value: /^(?=.*[a-zA-Z0-9가-힣])[A-Za-z0-9가-힣]{1,20}$/g,
                message: '20자 이하의 조합만 사용해주세요.',
              },
            })}
          />
          <button
            type="button"
            className={
              /^(?=.*[a-zA-Z0-9가-힣])[A-Za-z0-9가-힣]{1,20}$/g.test(
                watch('nick_name'),
              )
                ? styles.buttonStyleActive
                : styles.buttonStyleDisabled
            }
            disabled={
              !/^(?=.*[a-zA-Z0-9가-힣])[A-Za-z0-9가-힣]{1,20}$/g.test(
                watch('nick_name'),
              )
            }
            onClick={nicknameCheckHandler}
          >
            중복 확인
          </button>
        </div>
        <p
          className={
            nicknameCheck ? styles.correctMessage : styles.errorMessage
          }
        >
          {errors.nick_name && errors.nick_name.message}
          {!errors.nick_name && nicknameCheckMessage && nicknameCheckMessage}
        </p>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          className={
            nicknameCheck
              ? styles.buttonStyleActive
              : styles.buttonStyleDisabled
          }
          type="button"
          disabled={!nicknameCheck}
          onClick={handleSubmit(onUpdateNickname)}
        >
          변경
        </button>
        <button
          className={styles.buttonStyle}
          type="button"
          onClick={() => setEditMode('none')}
        >
          취소
        </button>
      </div>
    </li>
  );
}

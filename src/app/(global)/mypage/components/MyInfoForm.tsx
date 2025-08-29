import InputField from '@/components/InputField';

const MyInfoForm = () => {
  const INPUT_CLASS_NAME = 'mb-8 w-full';
  return (
    <div>
      <InputField label='닉네임' placeholder='닉네임' className={INPUT_CLASS_NAME}></InputField>
      <InputField label='이메일' placeholder='이메일' className={INPUT_CLASS_NAME}></InputField>
      <InputField
        label='비밀번호'
        placeholder='8자 이상 입력해 주세요'
        className={INPUT_CLASS_NAME}
      ></InputField>
      <InputField
        label='비밀번호 재입력'
        placeholder='비밀번호를 한번 더 입력해 주세요'
        className={INPUT_CLASS_NAME}
      ></InputField>
    </div>
  );
};

export default MyInfoForm;

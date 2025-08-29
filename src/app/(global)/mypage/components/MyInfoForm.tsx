import InputField from '@/components/InputField';

const MyInfoForm = () => {
  return (
    <div>
      <InputField label='닉네임' placeholder='닉네임' className='mb-8'></InputField>
      <InputField label='이메일' placeholder='이메일' className='mb-8'></InputField>
      <InputField
        label='비밀번호'
        placeholder='8자 이상 입력해 주세요'
        className='mb-8'
      ></InputField>
      <InputField
        label='비밀번호 재입력'
        placeholder='비밀번호를 한번 더 입력해 주세요'
        className='mb-8'
      ></InputField>
    </div>
  );
};

export default MyInfoForm;

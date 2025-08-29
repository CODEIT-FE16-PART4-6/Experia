import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Image from "next/image";
import Link from "next/link";

const SignupPage = () => {
  return (
    <main>
      <div>
        <Link href='/'>
          <Image src='/images/logo.svg' alt='Experia 로고' width={260} height={42} />
        </Link>
      </div>

      <form>
        <InputField label="이메일" placeholder="이메일을 입력해 주세요" type="email" />
        <InputField label="닉네임" placeholder="닉네임을 입력해 주세요" type="text" />
        <InputField label="비밀번호" placeholder="8자 이상 입력해 주세요" type="password" />
        <InputField label="비밀번호 확인" placeholder="비밀번호를 한번 더 입력해 주세요" type="password" />
        <Button type="submit" variant="POSITIVE" size="lg" disabled>
          로그인
        </Button>
      </form>

      <div>
        <div>
          회원이 아니신가요?
          <Link href="/signup" >
            로그인하기
          </Link>
        </div>

        <div>
          <div className="flex-1 h-px bg-gray-300"></div>
          <p>SNS 계정으로 로그인하기</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div>
          <Link href='https://www.kakaocorp.com/'>
            <Image src='/icons/ic_SocialLogo.svg' alt='kakao 로고' width={48} height={48} className="sm:w-18 sm:h-18" />
          </Link>
        </div>
      </div>
    </main >
  );
};
export default SignupPage;

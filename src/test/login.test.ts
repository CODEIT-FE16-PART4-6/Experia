// 로그인 테스트 스크립트
interface LoginResponse {
  success: boolean;
}

const testLogin = async (): Promise<void> => {
  const baseUrl = 'http://localhost:3001'; // 포트 3001로 변경

  console.log('🚀 로그인 테스트 시작...\n');

  // 1. 서버 상태 확인
  try {
    const response = await fetch(baseUrl);
    console.log('✅ 서버 실행 중 (포트 3001):', response.status);
  } catch (error) {
    console.log('❌ 서버 연결 실패:', (error as Error).message);
    return;
  }

  // 2. 로그인 API 테스트
  try {
    console.log('🔐 로그인 시도 중...');
    const loginResponse = await fetch(`${baseUrl}/api/auth/set-cookies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'aa@aa.com',
        password: '123123123',
      }),
    });

    console.log('✅ 로그인 API 응답:', loginResponse.status);

    if (loginResponse.ok) {
      const result: LoginResponse = await loginResponse.json();
      console.log('✅ 로그인 성공:', result);

      // 3. 보호된 페이지 접근 테스트 (로그인 후)
      try {
        const protectedResponse = await fetch(`${baseUrl}/mypage/my-activities`, {
          redirect: 'manual',
        });
        console.log('✅ 보호된 페이지 접근:', protectedResponse.status);

        if (protectedResponse.status === 200) {
          console.log('🎉 인증 성공! my-activities 페이지 접근 가능');
        } else if (protectedResponse.status === 307) {
          console.log('⚠️ 여전히 리다이렉트됨 - 쿠키 설정 확인 필요');
        }
      } catch (error) {
        console.log('❌ 보호된 페이지 접근 실패:', (error as Error).message);
      }
    } else {
      console.log('❌ 로그인 실패:', loginResponse.status);
      const errorText = await loginResponse.text();
      console.log('에러 내용:', errorText);
    }
  } catch (error) {
    console.log('❌ 로그인 API 실패:', (error as Error).message);
  }

  console.log('\n🎯 테스트 완료!');
  console.log('\n📝 브라우저에서 테스트:');
  console.log('1. http://localhost:3001 접속');
  console.log('2. 로그인 페이지에서 aa@aa.com / 123123123 입력');
  console.log('3. 로그인 후 /mypage/my-activities 페이지 확인');
};

// 직접 실행 시 테스트 실행
if (require.main === module) {
  testLogin().catch(console.error);
}

export default testLogin;

// 서버 테스트 스크립트
const testServer = async (): Promise<void> => {
  const baseUrl = 'http://localhost:3001'; // 포트 3001로 설정

  console.log('🚀 서버 테스트 시작...\n');

  // 1. 서버 상태 확인
  try {
    const response = await fetch(baseUrl);
    console.log('✅ 서버 실행 중:', response.status);
  } catch (error) {
    console.log('❌ 서버 연결 실패:', (error as Error).message);
    return;
  }

  // 2. 인증 페이지 접근 테스트
  try {
    const authResponse = await fetch(`${baseUrl}/signin`);
    console.log('✅ 로그인 페이지 접근:', authResponse.status);
  } catch (error) {
    console.log('❌ 로그인 페이지 접근 실패:', (error as Error).message);
  }

  // 3. 보호된 페이지 접근 테스트 (리다이렉트 확인)
  try {
    const protectedResponse = await fetch(`${baseUrl}/mypage/my-activities`, {
      redirect: 'manual',
    });
    console.log('✅ 보호된 페이지 접근 (리다이렉트):', protectedResponse.status);
  } catch (error) {
    console.log('❌ 보호된 페이지 접근 실패:', (error as Error).message);
  }

  // 4. API 엔드포인트 테스트
  try {
    const apiResponse = await fetch(`${baseUrl}/api/auth/set-cookies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'aa@aa.com',
        password: '123123123',
      }),
    });
    console.log('✅ 로그인 API 응답:', apiResponse.status);
  } catch (error) {
    console.log('❌ 로그인 API 실패:', (error as Error).message);
  }

  console.log('\n🎯 테스트 완료!');
  console.log('\n📝 다음 단계:');
  console.log('1. 브라우저에서 http://localhost:3001 접속');
  console.log('2. 로그인 후 /mypage/my-activities 페이지 테스트');
  console.log('3. 이미지 업로드 기능 테스트');
  console.log('4. 리뷰 작성 기능 테스트');
};

// 직접 실행 시 테스트 실행
if (require.main === module) {
  testServer().catch(console.error);
}

export default testServer;

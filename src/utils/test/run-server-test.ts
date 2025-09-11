#!/usr/bin/env tsx
// 서버 테스트 실행 스크립트
import testServer from './server.test';

testServer().catch(console.error);

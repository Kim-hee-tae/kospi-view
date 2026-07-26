import { getAccessToken } from "../api/kis/auth";

let accessToken = "";
let expiredAt = 0;

// 토큰 발급 중인지 저장
let tokenPromise: Promise<string> | null = null;

export async function getValidToken(): Promise<string> {

  const now = Date.now();

  // 1. 캐시된 토큰 사용
  if (accessToken && now < expiredAt) {
    console.log("✅ Cached Token");
    return accessToken;
  }

  // 2. 이미 다른 요청이 토큰을 발급 중이면 기다림
  if (tokenPromise) {
    console.log("⏳ Waiting Token...");
    return tokenPromise;
  }

  // 3. 첫 번째 요청만 토큰 발급
  tokenPromise = (async () => {

    console.log("🔄 Request New Token");

    const token = await getAccessToken();

    accessToken = token.access_token;

    expiredAt = Date.now() + ((token.expires_in - 60) * 1000);

    return accessToken;

  })();

  try {

    return await tokenPromise;

  } finally {

    // 발급 완료 후 반드시 초기화
    tokenPromise = null;

  }

}
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const loginId = ref("");
const password = ref("");
const router = useRouter();

const submitLogin = async () => {
  try {
    const response = await fetch("http://localhost:8088/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginId: loginId.value,
        password: password.value,
      }),
      credentials: "include", // 쿠키를 포함하여 서버에 요청
    });

    if (response.ok) {
      alert("로그인 성공");
      // 로그인 후 이동할 페이지
      router.push("/");
    } else {
      const errorData = await response.json(); // 에러 응답 파싱
      alert(`로그인 실패: ${errorData.message}`); // 서버에서 받은 에러 메시지 출력
    }
  } catch (error) {
    console.error("오류:", error);
    alert("서버와 통신 중 문제가 발생했습니다."); // 네트워크 오류 처리
  }
};
</script>

<template>
  <div class="login-container">
    <h2>로그인</h2>
    <input
      v-model="loginId"
      type="text"
      placeholder="아이디"
      class="login-input"
    />
    <input
      v-model="password"
      type="password"
      placeholder="비밀번호"
      class="login-input"
    />
    <button @click="submitLogin" class="login-button">로그인</button>
  </div>
</template>

<style scoped>
.login-container {
  background-color: #fff; /* 배경색 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 300px; /* 너비 설정 */
  margin: 50px auto; /* 중앙 정렬 */
  text-align: center;
}

.login-input {
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #444; /* 어두운 테두리 */
  border-radius: 4px;
  background-color: #333; /* 어두운 배경 */
  color: #f9f9f9; /* 밝은 텍스트 */
}

.login-input::placeholder {
  color: #aaa; /* 자리표시 텍스트 색상 */
}

.login-button {
  padding: 10px 20px;
  background-color: #444; /* 어두운 버튼 배경 */
  color: #f9f9f9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #555; /* 마우스 오버 시 밝은 색상 */
}
</style>

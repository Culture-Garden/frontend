<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const submitLogout = async () => {
  try {
    const response = await fetch("http://localhost:8088/api/auth/logout", {
      method: "POST",
      credentials: "include", // 쿠키를 포함하여 서버에 요청
    });

    if (response.ok) {
      alert("로그아웃 성공");
      // 로그아웃 후 이동할 페이지
      router.push("/");
    } else {
      alert("로그아웃 실패");
    }
  } catch (error) {
    console.error("오류:", error);
  }
};
</script>

<template>
  <div class="logout-container">
    <h2>로그아웃</h2>
    <p>정말 로그아웃 하시겠습니까?</p>
    <button @click="submitLogout" class="logout-button">로그아웃</button>
  </div>
</template>

<style scoped>
.logout-container {
  background-color: #fff; /* 배경색 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 300px; /* 너비 설정 */
  margin: 50px auto; /* 중앙 정렬 */
  text-align: center;
}

.logout-button {
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

.logout-button:hover {
  background-color: #555; /* 마우스 오버 시 밝은 색상 */
}
</style>

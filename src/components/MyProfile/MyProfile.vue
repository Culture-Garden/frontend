<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const userInfo = ref(null); // 사용자 정보 저장
const router = useRouter(); // useRouter로 router 인스턴스 가져오기

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8088/myProfile", {
      method: "GET",
      credentials: "include", // 쿠키 포함
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    userInfo.value = data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(fetchData);

// 사용자 정보 수정 페이지로 이동
const goToUpdateUserInfo = () => {
  if (userInfo.value) {
    router.push(`/myProfile/detail`);
  }
};
</script>

<template>
  <div v-if="userInfo">
    <h2>사용자 정보</h2>
    <div>
      <p><strong>아이디:</strong> {{ userInfo.loginId }}</p>
      <p><strong>이름:</strong> {{ userInfo.username }}</p>
    </div>
    <button @click="goToUpdateUserInfo" class="update-button">
      사용자 정보 수정
    </button>
  </div>
  <div v-else>
    <p>사용자 정보를 불러오는 중입니다...</p>
  </div>
</template>

<style scoped>
/* 스타일 설정 */
h2 {
  text-align: center;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

div {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

p {
  font-size: 1rem;
  margin-bottom: 10px;
}

.update-button {
  padding: 12px 20px;
  background-color: #555; /* 어두운 버튼 */
  color: #f9f9f9;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>

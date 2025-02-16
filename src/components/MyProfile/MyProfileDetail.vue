<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const userInfo = ref({
  loginId: "",
  username: "",
}); // 초기 사용자 정보

const router = useRouter();

// 사용자 정보 가져오기
const fetchUserData = async () => {
  try {
    const response = await fetch("http://localhost:8088/api/myProfile", {
      method: "GET",
      credentials: "include", // 쿠키 포함
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    userInfo.value = data; // 사용자 정보를 불러와서 form에 초기값 설정
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

// 사용자 정보 업데이트 요청
const updateUserData = async () => {
  try {
    const response = await fetch("http://localhost:8088/myProfile", {
      method: "PUT",
      credentials: "include", // 쿠키 포함
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo.value),
    });
    if (!response.ok) throw new Error("Failed to update user data");
    alert("사용자 정보가 성공적으로 업데이트되었습니다.");
    router.push("/myProfile"); // 업데이트 후 프로필 페이지로 이동
  } catch (error) {
    console.error("Error updating user data:", error);
    alert("사용자 정보 업데이트 중 오류가 발생했습니다.");
  }
};

onMounted(fetchUserData); // 페이지가 로드되면 사용자 데이터 가져오기
</script>

<template>
  <div>
    <h2>사용자 정보 수정</h2>
    <form @submit.prevent="updateUserData">
      <div>
        <label for="loginId">아이디:</label>
        <input id="loginId" v-model="userInfo.loginId" disabled />
      </div>
      <div>
        <label for="username">이름:</label>
        <input id="username" v-model="userInfo.username" required />
      </div>
      <button type="submit" class="save-button">저장</button>
    </form>
    <button @click="router.push('/myProfile')" class="cancel-button">
      취소
    </button>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

label {
  font-weight: bold;
}

input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button {
  background-color: #303131;
  color: white;
}

.save-button:hover {
  background-color: #0056b3;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
  margin-top: 10px;
}

.cancel-button:hover {
  background-color: #5a6268;
}
</style>

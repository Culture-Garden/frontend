<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const formData = ref({
  loginId: "",
  password: "",
  confirmPassword: "",
  username: "",
});

const errorMessage = ref(""); // 오류 메시지를 저장할 변수

const router = useRouter(); // useRouter로 router 인스턴스 가져오기
const submitForm = async () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  try {
    const response = await fetch("http://localhost:8088/api/auth/signUp", {
      // ec2에 맞춰서 임의 변경
      method: "POST",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      alert("회원가입 성공!");
      router.push("/");
    } else {
      errorMessage.value =
        "이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요."; // 중복 아이디 오류 메시지
    }
  } catch (error) {
    console.error("Error:", error);
    errorMessage.value = "서버와의 연결에 실패했습니다. 다시 시도해주세요."; // 네트워크 오류 메시지
  }
};
</script>

<template>
  <div class="form-container">
    <h2>회원가입</h2>
    <input
      v-model="formData.loginId"
      placeholder="아이디"
      type="text"
      class="form-input"
    />
    <input
      v-model="formData.password"
      placeholder="비밀번호"
      type="password"
      class="form-input"
    />
    <input
      v-model="formData.confirmPassword"
      placeholder="비밀번호 확인"
      type="password"
      class="form-input"
    />
    <input v-model="formData.username" placeholder="이름" class="form-input" />
    <button @click="submitForm" class="submit-button">가입하기</button>

    <!-- 오류 메시지가 있을 경우 표시 -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333; /* 어두운 배경 */
  border-radius: 8px;
  color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.form-container h2 {
  margin-bottom: 20px;
}

.form-input {
  width: 80%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #444; /* 어두운 입력 필드 */
  color: #f9f9f9;
  font-size: 1rem;
}

.form-input::placeholder {
  color: #aaa;
}

.submit-button {
  padding: 12px;
  width: 100%;
  background-color: #555; /* 어두운 버튼 */
  color: #f9f9f9;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #777; /* 버튼 호버 색상 */
}

.error-message {
  color: red;
  margin-top: 15px;
  font-size: 1rem;
}
</style>

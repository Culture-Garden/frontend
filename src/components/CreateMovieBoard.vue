<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const formData = ref({
  title: "",
  content: "",
});
const router = useRouter();

const submitForm = async () => {
  try {
    const response = await fetch("http://localhost:8088/board/movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
      credentials: "include", // 쿠키를 포함하여 서버에 요청
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Data saved:", result);
      router.push("/movie");
    } else {
      console.error("Failed to save data");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<template>
  <div class="form-container">
    <input v-model="formData.title" placeholder="제목" class="form-input" />
    <br />
    <textarea
      v-model="formData.content"
      placeholder="내용"
      class="form-textarea"
    ></textarea>
    <button @click="submitForm" class="submit-button">등록</button>
  </div>
</template>

<style scoped>
.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #f9f9f9; /* 밝은 텍스트 */
}

.form-input,
.form-textarea {
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #444; /* 어두운 테두리 */
  border-radius: 4px;
  background-color: #333; /* 어두운 배경 */
  color: #f9f9f9; /* 밝은 텍스트 */
  font-size: 1rem;
}

.form-textarea {
  height: 200px; /* 세로 높이 조정 (예: 200px) */
  resize: vertical; /* 사용자가 세로 크기를 조정할 수 있도록 */
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #aaa; /* 밝은 자리표시 텍스트 */
}

.submit-button {
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

.submit-button:hover {
  background-color: #555; /* 마우스 오버 시 약간 밝은 색 */
}
</style>

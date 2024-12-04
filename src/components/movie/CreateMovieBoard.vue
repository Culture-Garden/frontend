<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const formData = ref({
  title: "",
  content: "",
  image: null, // 이미지 추가
});
const router = useRouter();

const handleImageChange = (event) => {
  formData.value.image = event.target.files[0]; // 파일 선택
};

const submitForm = async () => {
  try {
    const formDataToSend = new FormData(); // FormData 객체 생성
    // 이미지 파일 추가
    formDataToSend.append("image", formData.value.image);

    // JSON 데이터를 Blob 형식으로 추가
    const boardRequest = {
      title: formData.value.title,
      content: formData.value.content,
    };
    formDataToSend.append(
      "boardRequest",
      new Blob([JSON.stringify(boardRequest)], { type: "application/json" })
    );

    const response = await fetch("http://localhost:8088/board/movie", {
      method: "POST",
      body: formDataToSend,
      credentials: "include", // 쿠키 포함하여 요청
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Data saved:", result);
      router.push("/movie");
    } else {
      console.error("Failed to save data");
      alert("로그인 후 이용 가능합니다");
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
    <br />
    <input type="file" @change="handleImageChange" class="form-input" />
    <br />
    <button @click="submitForm" class="submit-button">등록</button>
  </div>
</template>

<style scoped>
/* 스타일은 그대로 사용 */
.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #f9f9f9;
}

.form-input,
.form-textarea {
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #333;
  color: #f9f9f9;
  font-size: 1rem;
}

.form-textarea {
  height: 200px;
  resize: vertical;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #aaa;
}

.submit-button {
  padding: 10px 20px;
  background-color: #444;
  color: #f9f9f9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #555;
}
</style>

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

    const response = await fetch("http://localhost:8088/api/board/movie", {
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
    <textarea
      v-model="formData.content"
      placeholder="내용"
      class="form-textarea"
    ></textarea>
    <div class="file-input-wrapper">
      <input
        type="file"
        @change="handleImageChange"
        class="file-input"
        id="file-input"
      />
      <label for="file-input" class="file-input-label">파일 선택</label>
      <span class="file-name">
        {{ formData.image ? formData.image.name : "선택된 파일 없음" }}
      </span>
    </div>
    <button @click="submitForm" class="submit-button">등록</button>
  </div>
</template>

<style scoped>
.form-container {
  background-color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 8px 10px;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: #f9f9f9;
  color: #333;
}

.form-textarea {
  height: 150px;
  resize: none;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #aaa;
}

.file-input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
}

.file-input {
  display: none; /* 기본 파일 입력 숨김 */
}

.file-input-label {
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background-color 0.3s ease;
}

.file-input-label:hover {
  background-color: #0056b3;
}

.file-name {
  font-size: 0.85rem;
  color: #555;
  font-style: italic;
}

.submit-button {
  padding: 8px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  text-align: center;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #218838;
}
</style>

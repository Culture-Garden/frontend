<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const postDetails = ref({
  id: null,
  title: "",
  content: "",
  image: null, // 현재 이미지를 저장할 변수
  newImage: null, // 새로 업로드된 이미지를 저장할 변수
});
const route = useRoute();
const router = useRouter();

const fetchBoardById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8088/api/board/movie/${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching board by id:", error);
    return null;
  }
};

const handleImageChange = (event) => {
  postDetails.value.newImage = event.target.files[0]; // 새 이미지 파일 저장
};

const updateBoard = async () => {
  try {
    const formDataToSend = new FormData();
    if (postDetails.value.newImage) {
      formDataToSend.append("image", postDetails.value.newImage);
    }

    const boardRequest = {
      title: postDetails.value.title,
      content: postDetails.value.content,
    };
    formDataToSend.append(
      "boardRequest",
      new Blob([JSON.stringify(boardRequest)], { type: "application/json" })
    );

    const response = await fetch(
      `http://localhost:8088/board/movie/${postDetails.value.id}`,
      {
        method: "PUT",
        body: formDataToSend,
        credentials: "include",
      }
    );
    if (!response.ok) throw new Error("Failed to update the board");

    alert("게시글이 성공적으로 수정되었습니다.");
    router.replace(`/movie/${postDetails.value.id}`);
  } catch (error) {
    console.error("Error updating board:", error);
    alert("게시글 작성자만 수정할 수 있습니다.");
  }
};

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    const data = await fetchBoardById(id);
    if (data) {
      postDetails.value = data;
    }
  }
});
</script>

<template>
  <div class="form-container">
    <h2>게시글 수정</h2>
    <form @submit.prevent="updateBoard" class="form-layout">
      <div class="form-group">
        <label for="title">제목</label>
        <input
          id="title"
          v-model="postDetails.title"
          type="text"
          class="form-input"
          required
        />
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea
          id="content"
          v-model="postDetails.content"
          class="form-textarea"
          required
        ></textarea>
      </div>
      <div class="form-group image-group">
        <div>
          <label>현재 이미지</label>
          <div v-if="postDetails.image" class="current-image-container">
            <img
              :src="postDetails.image"
              alt="현재 이미지"
              class="current-image"
            />
          </div>
          <div v-else>이미지가 없습니다</div>
        </div>
        <div>
          <label for="new-image">새 이미지 업로드</label>
          <div class="custom-file-upload">
            <input
              id="new-image"
              type="file"
              @change="handleImageChange"
              class="file-input"
            />
            <label for="new-image" class="file-label">파일 선택</label>
            <span v-if="postDetails.newImage">{{
              postDetails.newImage.name
            }}</span>
          </div>
        </div>
      </div>
      <button type="submit" class="save-button">저장</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 20px auto;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-layout {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.image-group {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
}

label {
  font-size: 0.9rem;
  font-weight: bold;
  color: #444;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: #f9f9f9;
}

.form-textarea {
  height: 100px;
  resize: none;
}

.current-image-container {
  max-width: 200px;
}

.current-image {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.custom-file-upload {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-input {
  display: none;
}

.file-label {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.3s ease;
}

.file-label:hover {
  background-color: #0056b3;
}

.save-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  transition: background-color 0.3s ease;
  align-self: center;
}

.save-button:hover {
  background-color: #218838;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const postDetails = ref({
  title: "",
  content: "",
  image: null, // 현재 이미지를 저장할 변수
  newImage: null, // 새로 업로드된 이미지를 저장할 변수
});
const route = useRoute();
const router = useRouter();

const fetchBoardById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8088/board/movie/${id}`);
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
    // 새로 업로드된 이미지 파일이 있으면 추가
    if (postDetails.value.newImage) {
      formDataToSend.append("image", postDetails.value.newImage);
    }

    // 텍스트 데이터 추가
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
    alert("게시글 작성자만 수정 할 수 있습니다.");
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
  <div>
    <h2>게시글 수정</h2>
    <form @submit.prevent="updateBoard">
      <div class="form-group">
        <label for="title">제목</label>
        <input
          id="title"
          v-model="postDetails.title"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea
          id="content"
          v-model="postDetails.content"
          class="form-control"
          rows="5"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label>현재 이미지</label>
        <div v-if="postDetails.image">
          <img
            :src="postDetails.image"
            alt="현재 이미지"
            class="current-image"
          />
        </div>
        <div v-else>이미지가 없습니다</div>
      </div>
      <div class="form-group">
        <label for="new-image">새 이미지 업로드</label>
        <input
          id="new-image"
          type="file"
          @change="handleImageChange"
          class="form-control"
        />
      </div>
      <button type="submit" class="save-button">저장</button>
    </form>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

#title,
#content {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.current-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}

.save-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #0056b3;
}
</style>

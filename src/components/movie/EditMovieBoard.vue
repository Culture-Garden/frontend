<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const postDetails = ref({
  title: "",
  content: "",
}); // 게시글 데이터 객체
const route = useRoute(); // 현재 라우터 정보 가져오기
const router = useRouter(); // 페이지 이동을 위해 사용

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

const updateBoard = async () => {
  try {
    const response = await fetch(
      `http://localhost:8088/board/movie/${postDetails.value.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postDetails.value),
        credentials: "include", // 쿠키를 포함하여 서버에 요청
      }
    );
    if (!response.ok) throw new Error("Failed to update the board");
    alert("게시글이 성공적으로 수정되었습니다.");
    // 수정 후 현재 페이지 새로고침
    router.replace(`/movie/${postDetails.value.id}`);
  } catch (error) {
    console.error("Error updating board:", error);
    alert("게시글 수정에 실패했습니다.");
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

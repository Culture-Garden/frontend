<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const postDetails = ref(null); // 선택된 게시글 세부정보
const route = useRoute(); // 현재 라우터 정보 가져오기
const router = useRouter(); // 페이지 이동을 위한 라우터

const fetchBoardById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8088/board/movie/${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching board by id:", error);
    return null; // 오류 발생 시 null 반환
  }
};

const deleteBoardById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8088/board/movie/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete the post");
    alert("게시글이 삭제되었습니다.");
    router.push("/movie"); // 삭제 후 목록 페이지로 이동
  } catch (error) {
    console.error("Error deleting board:", error);
    alert("삭제 중 오류가 발생했습니다.");
  }
};

const goToEditPage = (id) => {
  router.push(`/movie/edit/${id}`); // 수정 페이지로 이동
};

onMounted(async () => {
  const id = route.params.id; // 현재 URL에서 id 가져오기
  if (id) {
    postDetails.value = await fetchBoardById(id); // 게시글 정보 가져오기
  } else {
    console.error("No ID provided in the route");
  }
});
</script>

<template>
  <div v-if="postDetails">
    <h2>{{ postDetails.title }}</h2>
    <p>작성자: {{ postDetails.username }}</p>
    <p>작성일자: {{ postDetails.createdAt }}</p>
    <p>{{ postDetails.content }}</p>

    <!-- 수정 및 삭제 버튼 추가 -->
    <div class="action-buttons">
      <button @click="goToEditPage(postDetails.id)" class="edit-button">
        수정
      </button>
      <button @click="deleteBoardById(postDetails.id)" class="delete-button">
        삭제
      </button>
    </div>
  </div>
  <div v-else>
    <p>게시글을 찾을 수 없습니다.</p>
  </div>
</template>

<style scoped>
.action-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
  gap: 10px;
}

.edit-button,
.delete-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button {
  background-color: #374e65;
  color: white;
}

.delete-button {
  background-color: #86474c;
  color: white;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>

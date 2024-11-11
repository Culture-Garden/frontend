<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // useRouter 훅 사용

const posts = ref([]);
const router = useRouter(); // useRouter로 router 인스턴스 가져오기

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8088/board/movie/all");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    posts.value = data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(fetchData);

const goToCreateBoard = () => {
  router.push("/movie/create");
};

// postId를 받아서 detail 페이지로 이동
const goToDetail = (postId) => {
  router.push(`/movie/${postId}`);
};
</script>

<template>
  <div class="board">
    <div class="button-container">
      <button type="button" @click="goToCreateBoard" class="create-button">
        글 작성
      </button>
    </div>

    <!-- 게시글 목록 -->
    <table class="posts-table">
      <thead>
        <tr>
          <th>글 번호</th>
          <th>작성자</th>
          <th>제목</th>
          <th>작성일자</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id" @click="goToDetail(post.id)">
          <!-- post.id를 전달 -->
          <td>{{ post.id }}</td>
          <td>{{ post.username }}</td>
          <!-- 작성자를 표시하도록 수정 -->
          <td>{{ post.title }}</td>
          <td>{{ post.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.board {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.board h2 {
  text-align: center;
  margin-bottom: 20px;
}

.post-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.post-form input,
.post-form textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.post-form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.posts-table {
  width: 100%;
  border-collapse: collapse;
}

.posts-table th,
.posts-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.posts-table th {
  background-color: #333;
  color: #f9f9f9;
}

.posts-table tr:hover {
  background-color: #f1f1f1;
}

.button-container {
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
  margin-bottom: 10px;
}

.create-button {
  padding: 10px 20px;
  background-color: #333; /* 어두운 배경색 */
  color: #f9f9f9; /* 밝은 텍스트 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 약간 강한 그림자 */
  transition: background-color 0.3s ease;
}

.create-button:hover {
  background-color: #555; /* 마우스 오버 시 약간 밝은 색 */
}
</style>

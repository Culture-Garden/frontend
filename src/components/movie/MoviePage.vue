<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // useRouter 훅 사용

const posts = ref([]);
const totalElements = ref(0); // 전체 게시글 수
const totalPages = ref(0); // 전체 페이지 수
const currentPage = ref(0); // 현재 페이지
const pageSize = ref(10); // 한 페이지에 표시할 게시글 수
const searchTitle = ref(""); // 검색할 제목
const router = useRouter(); // useRouter로 router 인스턴스 가져오기

// 데이터 fetching 함수
const fetchData = async (
  page = currentPage.value,
  title = searchTitle.value
) => {
  try {
    const response = await fetch(
      `http://localhost:8088/board/movie?title=${title}&page=${page}&size=${
        pageSize.value - 1
      }`
    ); // 페이지네이션과 검색어를 포함한 URL
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    posts.value = data.content; // content 배열을 사용하여 게시글 목록 설정
    totalElements.value = data.totalElements; // 전체 게시글 수
    totalPages.value = data.totalPages; // 전체 페이지 수
    currentPage.value = page; // 현재 페이지 업데이트
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => fetchData());

// 글 작성 페이지로 이동
const goToCreateBoard = () => {
  router.push("/movie/create");
};

// postId를 받아서 detail 페이지로 이동
const goToDetail = (postId) => {
  router.push(`/movie/${postId}`);
};

// 페이지 이동 함수
const goToPage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    fetchData(page); // 해당 페이지 데이터 요청
  }
};

// 검색 버튼 클릭 시 데이터 재요청
const searchPosts = () => {
  fetchData(0); // 첫 번째 페이지부터 검색 결과 요청
};
</script>

<template>
  <div class="board">
    <div class="button-container">
      <button type="button" @click="goToCreateBoard" class="create-button">
        글 작성
      </button>
    </div>

    <!-- 제목 검색 -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchTitle"
        placeholder="제목으로 검색"
        @input="searchPosts"
        class="search-input"
      />
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
          <td>{{ post.id }}</td>
          <td>{{ post.username }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.createdAt }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 페이지 네비게이션 -->
    <div class="pagination">
      <button :disabled="currentPage === 0" @click="goToPage(currentPage - 1)">
        Previous
      </button>
      <span>{{ currentPage + 1 }} / {{ totalPages }}</span>
      <button
        :disabled="currentPage === totalPages - 1"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
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

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pagination button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.search-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.search-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
}
</style>

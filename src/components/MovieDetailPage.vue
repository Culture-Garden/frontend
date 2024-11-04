<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const posts = ref([]); // 게시글 데이터를 담을 배열
const postDetails = ref(null); // 선택된 게시글 세부정보
const route = useRoute(); // 현재 라우터 정보를 가져옴

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8088/board/movie");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    posts.value = data;
    // 선택된 게시글 찾기
    const postId = route.params.id; // URL에서 전달된 ID
    postDetails.value = posts.value.find(
      (post) => post.id === parseInt(postId)
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(fetchData);
</script>

<template>
  <div v-if="postDetails">
    <h2>{{ postDetails.title }}</h2>
    <p>작성일자: {{ postDetails.createdAt }}</p>
    <p>{{ postDetails.content }}</p>
    <!-- 내용 표시 -->
  </div>
  <div v-else>
    <p>게시글을 찾을 수 없습니다.</p>
  </div>
</template>

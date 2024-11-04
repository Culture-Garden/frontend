<script setup></script>

<template>
  <div class="page-container">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 800px; /* 중앙 정렬을 위한 최대 너비 */
  margin: 40px auto; /* 상하 여백과 자동 수평 정렬 */
  padding: 20px;
  background-color: #f9f9f9; /* 연한 배경색 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  border-radius: 8px;
  color: #333; /* 텍스트 색상 */
  font-family: Arial, sans-serif; /* 가독성 높은 폰트 */
  line-height: 1.6;
}

.page-container h2 {
  color: #333;
  font-size: 1.8em;
  margin-bottom: 10px;
}

.page-container p {
  margin: 0 0 15px;
}

.page-container a {
  color: #007bff; /* 링크 색상 */
  text-decoration: none;
}

.page-container a:hover {
  text-decoration: underline;
}
</style>

<script setup></script>

<template>
  <footer class="footer">
    <p>&copy; 2024 My Website. All rights reserved.</p>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333; /* 어두운 배경색 */
  color: #f9f9f9; /* 밝은 텍스트 색상 */
  text-align: center; /* 텍스트 중앙 정렬 */
  padding: 20px 0; /* 상하 여백 */
  font-size: 0.9em; /* 작은 글꼴 크기 */
  margin-top: 40px; /* 위쪽 여백 */
  border-top: 2px solid #555; /* 상단 경계선 */
}

.footer p {
  margin: 0; /* 기본 여백 제거 */
}

.footer a {
  color: #ddd; /* 링크 색상 */
  text-decoration: none;
}

.footer a:hover {
  color: #fff; /* 호버 시 색상 변경 */
  text-decoration: underline;
}
</style>

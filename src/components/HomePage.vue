<script setup></script>

<template>
  <div class="homepage">
    <h2>교양의 습작에 오신걸 환영합니다!</h2>
    <p>이 곳은 교양과 관련된 이야기를 나누는 자리입니다.</p>
    <img
      src="../assets/BoardMainPicture.jpg"
      alt="Board Main Image"
      class="homepage-image"
    />
    <p>
      <i
        >"진정한 교양은 지식을 넘어서, 그 지식을 어떻게 사용하는가에 있다." -
        Isaiah Berlin</i
      >
    </p>
  </div>
</template>

<style scoped>
.homepage {
  padding: 20px;
  background-color: #f9f9f9; /* 배경색 */
  border-radius: 8px; /* 둥근 테두리 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  text-align: center; /* 텍스트 중앙 정렬 */
  color: #333; /* 텍스트 색상 */
}

.homepage h2 {
  font-size: 2em; /* 제목 크기 */
  margin-bottom: 15px; /* 아래 여백 */
}

.homepage p {
  margin: 10px 0; /* 위아래 여백 */
  line-height: 1.5; /* 줄 간격 */
}

.homepage-image {
  max-width: 100%; /* 이미지의 최대 너비 */
  height: auto; /* 자동 높이 */
  border-radius: 8px; /* 둥근 이미지 테두리 */
  margin: 20px 0; /* 이미지 위아래 여백 */
}
</style>

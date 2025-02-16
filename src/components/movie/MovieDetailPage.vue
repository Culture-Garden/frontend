<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const postDetails = ref(null); // 게시글 세부 정보
const comments = ref([]); // 댓글 목록
const newComment = ref(""); // 새 댓글 내용
const editCommentId = ref(null); // 수정 중인 댓글 ID
const editCommentContent = ref(""); // 수정 중인 댓글 내용

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

const deleteBoardById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8088/board/movie/${id}`, {
      method: "DELETE",
      credentials: "include", // 쿠키를 포함하여 서버에 요청
    });
    if (!response.ok) throw new Error("Failed to delete the post");
    alert("게시글이 삭제되었습니다.");
    router.push("/movie"); // 삭제 후 목록 페이지로 이동
  } catch (error) {
    console.error("Error deleting board:", error);
    alert("게시글 작성자만 삭제할 수 있습니다.");
  }
};

const fetchComments = async (boardId) => {
  try {
    const response = await fetch(`http://localhost:8088/comment/${boardId}`);
    if (!response.ok) throw new Error("Failed to fetch comments");
    comments.value = await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

const createComment = async () => {
  const trimmedComment = newComment.value.trim(); // 공백 제거한 댓글 내용

  if (!trimmedComment) {
    alert("빈 댓글은 작성할 수 없습니다."); // 공백 댓글 방지
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8088/comment/${route.params.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmedComment }),
        credentials: "include", // 쿠키를 포함하여 서버에 요청
      }
    );
    if (!response.ok) throw new Error("Failed to create comment");

    newComment.value = ""; // 입력란 초기화
    fetchComments(route.params.id); // 댓글 목록 새로고침
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};

const updateComment = async (commentId) => {
  try {
    const response = await fetch(
      `http://localhost:8088/comment/${route.params.id}/${commentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editCommentContent.value }),
        credentials: "include", // 쿠키를 포함하여 서버에 요청
      }
    );
    if (!response.ok) throw new Error("Failed to update comment");
    editCommentId.value = null;
    fetchComments(route.params.id);
  } catch (error) {
    console.error("Error updating comment:", error);
    alert("댓글 작성자만 수정 할 수 있습니다.");
  }
};

const deleteComment = async (commentId) => {
  try {
    const response = await fetch(
      `http://localhost:8088/comment/${route.params.id}/${commentId}`,
      {
        method: "DELETE",
        credentials: "include", // 쿠키를 포함하여 서버에 요청
      }
    );
    if (!response.ok) throw new Error("Failed to delete comment");
    fetchComments(route.params.id);
  } catch (error) {
    console.error("Error deleting comment:", error);
    alert("댓글 작성자만 삭제할 수 있습니다.");
  }
};

const goToEditPage = (id) => {
  router.push(`/movie/edit/${id}`); // 수정 페이지로 이동
};

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    postDetails.value = await fetchBoardById(id);
    fetchComments(id); // 댓글 목록 가져오기
  } else {
    console.error("No ID provided in the route");
  }
});
</script>

<template>
  <div v-if="postDetails">
    <h2 class="post-title">{{ postDetails.title }}</h2>
    <div class="post-meta">
      <p class="post-author">{{ postDetails.username }}</p>
      <p class="post-date">{{ postDetails.createdAt }}</p>
    </div>
    <p>{{ postDetails.content }}</p>

    <!-- 이미지 표시 -->
    <div v-if="postDetails.image">
      <img :src="postDetails.image" alt="게시글 이미지" class="post-image" />
    </div>

    <div class="action-buttons">
      <button @click="goToEditPage(postDetails.id)" class="edit-button">
        수정
      </button>
      <button @click="deleteBoardById(postDetails.id)" class="delete-button">
        삭제
      </button>
    </div>

    <!-- 댓글 섹션 -->
    <h3>댓글</h3>
    <div class="comment-section">
      <ul class="comment-list">
        <li class="comment-item" v-for="comment in comments" :key="comment.id">
          <div class="comment-details">
            <p v-if="editCommentId !== comment.id" class="comment-content">
              {{ comment.content }}
            </p>
            <div v-else class="comment-edit">
              <textarea
                v-model="editCommentContent"
                class="comment-edit-input"
                placeholder="댓글을 수정하세요"
              ></textarea>
            </div>
            <div class="comment-meta">
              <p class="comment-username">{{ comment.username }}</p>
              <p class="comment-createdAt">{{ comment.createdAt }}</p>
            </div>
          </div>
          <div class="comment-actions">
            <button
              v-if="editCommentId !== comment.id"
              @click="
                () => {
                  editCommentId = comment.id;
                  editCommentContent = comment.content;
                }
              "
              class="edit-button"
            >
              수정
            </button>
            <button
              v-if="editCommentId === comment.id"
              @click="updateComment(comment.id)"
              class="save-button"
            >
              등록
            </button>
            <button
              v-if="editCommentId !== comment.id"
              @click="deleteComment(comment.id)"
              class="delete-button"
            >
              삭제
            </button>
          </div>
        </li>
      </ul>

      <!-- 댓글 작성 입력란 -->
      <div class="new-comment">
        <input
          v-model="newComment"
          placeholder="댓글을 입력하세요"
          class="comment-input"
        />
        <button @click="createComment" class="submit-comment-btn">
          댓글 작성
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>게시글을 찾을 수 없습니다.</p>
  </div>
</template>

<style scoped>
.post-title {
  font-size: 2em;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: #555;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.post-meta .post-author {
  font-weight: bold;
}

.post-meta .post-date {
  font-style: italic;
}

.post-content {
  font-size: 1.1em;
  line-height: 1.6;
  color: #444;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.edit-button,
.delete-button,
.save-button {
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

.save-button {
  background-color: #28a745;
  color: white;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button:hover {
  background-color: #c82333;
}

.save-button:hover {
  background-color: #218838;
}

/* 이미지 스타일 */
.post-image {
  max-width: 80%; /* 화면의 80% 크기로 조정 */
  height: auto; /* 비율에 맞춰 자동으로 높이 조정 */
  margin-top: 20px;
  border-radius: 8px;
  display: block;
  margin-left: auto; /* 가운데 정렬 */
  margin-right: auto; /* 가운데 정렬 */
}

/* 댓글 섹션 스타일 */
.comment-section {
  margin-top: 30px;
}

.comment-list {
  list-style-type: none;
  padding-left: 0;
}

.comment-item {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.comment-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.comment-actions button {
  padding: 5px 10px;
  cursor: pointer;
}

.comment-input {
  padding: 10px;
  width: 80%;
  margin-right: 10px;
}

.submit-comment-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.submit-comment-btn:hover {
  background-color: #0056b3;
}

.comment-edit-input {
  width: 100%;
  height: 50px;
  padding: 10px;
}

.comment-meta {
  font-size: 0.9em;
  color: #666;
  margin-top: 5px;
}

.comment-username {
  font-weight: bold;
}

.comment-createdAt {
  font-style: italic;
}
</style>

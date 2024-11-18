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
    const response = await fetch(`http://localhost:8088/board/movie/${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching board by id:", error);
    return null;
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
  }
};

const deleteComment = async (commentId) => {
  try {
    const response = await fetch(
      `http://localhost:8088/comment/${route.params.id}/${commentId}`,
      { method: "DELETE" }
    );
    if (!response.ok) throw new Error("Failed to delete comment");
    fetchComments(route.params.id);
  } catch (error) {
    console.error("Error deleting comment:", error);
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
    <h2>{{ postDetails.title }}</h2>
    <p>작성자: {{ postDetails.username }}</p>
    <p>작성일자: {{ postDetails.createdAt }}</p>
    <p>{{ postDetails.content }}</p>

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
          <div>
            <p v-if="editCommentId !== comment.id" class="comment-content">
              {{ comment.content }}
            </p>
            <input
              v-else
              v-model="editCommentContent"
              @keyup.enter="updateComment(comment.id)"
              class="comment-edit-input"
            />
            <p class="comment-username">작성자: {{ comment.username }}</p>
            <p class="comment-username">작성자: {{ comment.createComment }}</p>

            <!-- 댓글 작성자 표시 -->
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
            <button @click="deleteComment(comment.id)" class="delete-button">
              삭제
            </button>
          </div>
        </li>
      </ul>
      <div class="new-comment">
        <input v-model="newComment" placeholder="댓글을 입력하세요" />
        <button @click="createComment">댓글 작성</button>
      </div>
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

/* 댓글 섹션 스타일 */
.comment-section {
  margin-top: 30px;
}

.comment-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-item {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-content {
  flex-grow: 1;
  margin-right: 10px;
}

.comment-actions {
  display: flex;
  gap: 5px;
}

.comment-actions button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.comment-actions .edit-button {
  background-color: #3778c2;
  color: white;
}

.comment-actions .delete-button {
  background-color: #d9534f;
  color: white;
}

.comment-actions .edit-button:hover {
  background-color: #0056b3;
}

.comment-actions .delete-button:hover {
  background-color: #c82333;
}

.new-comment {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.new-comment input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.new-comment button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.new-comment button:hover {
  background-color: #218838;
}
</style>

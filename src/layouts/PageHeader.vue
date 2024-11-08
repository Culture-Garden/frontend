<script setup></script>

<template>
  <header id="nav">
    <RouterLink to="/" class="logo">영화의 습작</RouterLink>
    <nav>
      <RouterLink to="/movie" class="nav-link">Movie</RouterLink>
      <RouterLink to="/signUp" class="nav-link">Sign Up</RouterLink>
      <RouterLink to="/login" class="nav-link">Login</RouterLink>
      <RouterLink to="/logout" class="nav-link">Logout</RouterLink>
      <RouterLink :to="`/myProfile`" class="nav-link">User</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
#nav {
  background-color: #333;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5em;
  margin: 0;
  color: #fff; /* 제목 색상 */
  text-decoration: none; /* 링크의 기본 밑줄 제거 */
  font-weight: bold; /* 제목 두껍게 */
}

#nav nav {
  display: flex;
  gap: 15px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #555;
}
</style>

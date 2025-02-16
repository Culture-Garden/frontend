<script setup>
import { ref, onMounted } from "vue";

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const baseTime = `${hours}${minutes}`;
  const roundedBaseTime = baseTime.slice(0, 2) + "00";

  return {
    baseDate: `${year}${month}${date}`,
    baseTime: roundedBaseTime,
    currentDateTime: `${year}-${month}-${date} ${hours}:${minutes}`,
  };
};

const { baseDate, baseTime, currentDateTime } = getCurrentDateTime();
const baseDateRef = ref(baseDate);
const baseTimeRef = ref(baseTime);
const currentDateTimeRef = ref(currentDateTime);

const nx = ref(60);
const ny = ref(127);

const weatherData = ref([]);
const errorMessage = ref("");

const weatherCategories = {
  T1H: "기온 (℃)",
  RN1: "강수량 (mm)",
  REH: "습도 (%)",
  VEC: "풍향 (deg)",
  WSD: "풍속 (m/s)",
};

const fetchWeatherData = async () => {
  try {
    errorMessage.value = "";
    const response = await fetch(
      `http://localhost:8088/api/weather?baseDate=${baseDateRef.value}&baseTime=${baseTimeRef.value}&nx=${nx.value}&ny=${ny.value}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    weatherData.value = data.filter((item) => weatherCategories[item.category]);
  } catch (error) {
    errorMessage.value = error.message;
  }
};

onMounted(fetchWeatherData);
</script>

<template>
  <div class="weather-container">
    <div class="header">
      <h1>🌤️ 오늘의 날씨</h1>
      <p class="date-time">{{ currentDateTimeRef }}</p>
    </div>

    <div v-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>

    <div v-else class="weather-list">
      <div
        v-for="(item, index) in weatherData"
        :key="index"
        class="weather-item"
      >
        <h2>{{ weatherCategories[item.category] }}</h2>
        <p>{{ item.obsrValue }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-container {
  font-family: "Arial", sans-serif;
  background: linear-gradient(to bottom, #4facfe, #00f2fe);
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 2s;
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  margin: 0;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.date-time {
  font-size: 0.9rem;
  color: #f0f8ff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.error {
  color: #ff0000;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
}

.weather-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.weather-item {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
}

.weather-item:hover {
  transform: scale(1.05);
  background: #d8f3ff;
}

.weather-item h2 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  color: #1e3a8a;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.weather-item p {
  font-size: 1rem;
  color: #2d3748;
  background: #edf2f7;
  border-radius: 8px;
  padding: 0.3rem 0.5rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

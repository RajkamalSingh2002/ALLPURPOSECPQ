# AllPurposeCPQ – Basic Setup Summary

### 🧩 Backend (Spring Boot)
**Steps completed:**
1. Created Maven project with Spring Boot 3.5.7.
2. Configured Java 17 compiler.
3. Changed default server port to `8081` in `application.properties`.
4. Added test REST controller (`/api/hello`).
5. Enabled CORS for frontend (`http://localhost:5173`).


**Run the backend:**
```bash
cd Backend
./mvnw spring-boot:run
```

---

### 💻 Frontend (React + Vite)
**Steps completed:**
1. Created new Vite React project inside `Frontend` folder.
2. Installed dependencies and verified app runs on port `5173`.
3. Added Axios to connect with backend API.
4. Successfully fetched backend response to confirm connection.

**Run the frontend:**
```bash
cd Frontend
npm install
npm run dev
```
---

### 🔗 Combined Verification
- Backend running on: `http://localhost:8081/hello`
- Frontend running on: `http://localhost:5173`
- Connection verified through API response displayed in React app.

---

### ✅ Current Status
- Backend and frontend setup completed.
- Connection confirmed between both applications.
- Ready for next stage of feature development.
- OAuth implemented and integrated with Frontend.

# Dayflow Frontend Documentation (Detailed)

This document provides a detailed description of the Dayflow HRMS frontend, including its architecture, state management strategy, component structure, and key user flows.

---

## 1. Frontend Architecture

-   **Framework**: **React 18+** with functional components and Hooks.
-   **Styling**: **Tailwind CSS** for utility-first styling, ensuring rapid and consistent UI development.
-   **Component Library**: **Headless UI** (by the Tailwind CSS team) for accessible, unstyled components like modals and dropdowns, giving full style control. `react-hot-toast` for notifications.
-   **Data Fetching & State**: **React Query (TanStack Query)** is the core of the frontend's server state management. It handles all data fetching, caching, and synchronization with the backend, drastically simplifying loading and error states.
-   **Global Client State**: **Zustand** is used for minimal global client state, primarily for managing the authenticated user's session data (token, user role) and UI state like modal visibility.
-   **Routing**: **React Router** for all client-side routing.

---

## 2. State Management Strategy

-   **Server State (React Query)**: All data that comes from the API (`/users`, `/attendance`, etc.) is managed by React Query. This means we don't store API responses in global state stores. Instead, we define query keys and use hooks like `useQuery`.
    -   *Example*: `useQuery(['users'], fetchUsers)` handles fetching, caching, and background-refetching of the employee list.
-   **Client State (Zustand)**: Only state that originates and lives exclusively in the client is managed here.
    -   `sessionStore`: Holds the user object and token. `useSession.getState().user` can be used to check roles for conditional rendering.
    -   `uiStore`: Manages the state of modals (e.g., `isRequestLeaveModalOpen`).

---

## 3. Component & Page Breakdown

### 3.1. Authentication (`/auth`)

-   **Page: `LoginPage.jsx`**
    -   **State**: Uses the `useMutation` hook from React Query to handle the login action: `const loginMutation = useMutation(api.auth.login, { onSuccess: ... });`
    -   **Components**: Renders a `<LoginForm />` component.
    -   **Flow**: On form submission, `loginMutation.mutate(credentials)` is called. On success, the JWT and user data are stored in the Zustand `sessionStore`, and the user is redirected to the dashboard. `react-hot-toast` is used to show success or error notifications.

### 3.2. Main Layout

-   **Component: `AppLayout.jsx`**
    -   **Purpose**: The main shell for the authenticated app.
    -   **Functionality**:
        1.  It checks the `sessionStore` for a valid user session. If none exists, it redirects to `/login`.
        2.  Renders the main `<Header />` and `<Sidebar />`.
        3.  Renders the child pages via React Router's `<Outlet />`.
-   **Component: `<Header />`**
    -   Contains the company logo and a `<UserProfileDropdown />`.
-   **Component: `<UserProfileDropdown />`**
    -   Uses Headless UI's `Menu` component.
    -   Displays user avatar and name.
    -   Menu items link to `/profile/me` ("My Profile") and a "Log Out" button that clears the `sessionStore` and redirects to `/login`.

### 3.3. Employee Directory (`/employees`)

-   **Page: `EmployeesPage.jsx`**
    -   **State**: `const { data: users, isLoading, error } = useQuery(['users'], api.users.getAll);`
    -   **Functionality**: Handles the loading and error states. If `isLoading`, it displays a grid of skeleton loaders. If `error`, an error message. Otherwise, it maps `users` to `<EmployeeCard />` components.
-   **Component: `<EmployeeCard user={...} />`**
    -   **Props**: `user: UserSummaryObject` (id, name, profilePictureUrl, attendanceStatus).
    -   **Renders**: A styled card containing the user's avatar, name, and role. It includes the `<AttendanceStatusIndicator />`. The entire card is wrapped in a `<Link to={'/profile/' + user.id}>`.
-   **Component: `<AttendanceStatusIndicator status={...} />`**
    -   **Props**: `status: 'Present' | 'Absent' | 'OnLeave'`.
    -   **Renders**: A small `div` with a `bg-green-500` or `bg-yellow-500` class based on the `status` prop.

### 3.4. User Profile (`/profile/:userId`)

-   **Page: `ProfilePage.jsx`**
    -   **State**: Fetches data for a specific user: `const { data: user } = useQuery(['user', userId], () => api.users.getOne(userId));`
    -   **Functionality**: Conditionally renders UI based on user role.
        -   It checks `const { user: currentUser } = useSession.getState();`
        -   The "Salary Info" tab is rendered only if `currentUser.role === 'Admin'`.
        -   Edit/Save buttons are rendered if `currentUser.role === 'Admin' || currentUser.id === userId`.

### 3.5. Time Off (`/time-off`) - A Detailed Flow

This section exemplifies a complete user flow, integrating state management and API calls.

**Flow: Employee requests leave.**

1.  **User Action**: The employee navigates to `/time-off` and clicks the "Request Leave" button.
2.  **State Change**: This action calls `uiStore.getState().openRequestLeaveModal()`, setting a boolean in the Zustand store to `true`.
3.  **UI Response**: The `<TimeOffPage>` component listens to this state. The `<RequestLeaveModal />` is rendered because its `isOpen` prop is now true.
4.  **Inside the Modal**: The modal contains a form (`<RequestLeaveForm />`). The form uses `useMutation` to prepare for the API call: `const requestLeave = useMutation(api.leave.apply, ...);`.
5.  **Form Submission**: The user fills in the form and clicks "Submit". The form's `onSubmit` handler calls `requestLeave.mutate(formData)`.
6.  **API Call & Caching**: React Query sends the `POST /api/leave/apply` request. On success, we want to update the list of leave requests shown on the page.
7.  **Automatic Re-fetch**: In the `onSuccess` callback of the `useMutation` hook, we use the query client to invalidate the query for the leave list: `queryClient.invalidateQueries(['leave']);`.
8.  **UI Update**: React Query automatically detects the invalidation and re-fetches the `GET /api/leave` endpoint. The new data flows into the `<TimeOffTable />`, which re-renders to show the new request in "Pending" status.
9.  **Final State Change**: The `onSuccess` callback also calls `uiStore.getState().closeRequestLeaveModal()`, closing the modal and showing a "Request submitted!" toast notification.

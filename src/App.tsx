import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import TodoList from "./components/TodoList";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </>
  );
}

export default App;

import Todos from "./Todos";
import TodoForm from "./TodoForm";

const TodoList = () => {
  return (
    <div className="max-w-max mx-auto p-4">
      <TodoForm />
      <Todos isDone={false} />
      <Todos isDone={true} />
    </div>
  );
};

export default TodoList;

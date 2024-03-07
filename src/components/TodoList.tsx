import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const TodoList = () => {
  return (
    <div className="max-w-max mx-auto p-4">
      <TodoForm />
      <TodoItem isDone={false} />
      <TodoItem isDone={true} />
    </div>
  );
};

export default TodoList;

import { TodoWithId } from "../types/types";
import { useTodos } from "../hooks/useTodos";

interface TodoItemProps {
  isDone: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ isDone }) => {
  const { todos, isLoading, error, updateTodo, deleteTodo } = useTodos();

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId);
  };

  const handleToggleTodo = (todoId: number) => {
    updateTodo(todoId);
  };

  return (
    <>
      <div>
        <h1 className="text-lg font-bold mb-4">
          {isDone ? "완료된 일정" : "진행중인 일정"}
        </h1>
        <div className="grid grid-cols-4 gap-4">
          {isLoading && <div>Loading...</div>}
          {error && <div>Error</div>}
          {todos &&
            todos
              .filter((todo: TodoWithId) => todo.selected === isDone)
              .map((todo: TodoWithId) => (
                <div
                  key={todo.id}
                  className="border border-gray-300 rounded-md p-4 mb-4 flex flex-col justify-between"
                >
                  <div>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={todo.selected}
                      onChange={() => {
                        handleToggleTodo(todo.id);
                      }}
                    />
                    <div className="flex flex-col">
                      <p className="font-bold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {todo.title}
                      </p>
                      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {todo.content}
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <button
                      className="w-16 h-8 bg-gray-500 hover:bg-gray-600 text-white rounded-md px-2 py-1 mx-auto"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default TodoItem;

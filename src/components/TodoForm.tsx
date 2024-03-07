import { Todo } from "../types/types";
import { useTodos } from "../hooks/useTodos";

const TodoForm = () => {
  const { addTodo } = useTodos();

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.target as HTMLFormElement).elements.namedItem(
      "title"
    ) as HTMLInputElement;
    const content = (e.target as HTMLFormElement).elements.namedItem(
      "content"
    ) as HTMLInputElement;

    if (!title.value || !content.value) return;

    const newTodo: Todo = {
      title: title.value,
      content: content.value,
      selected: false,
      createdAt: new Date(),
    };
    addTodo(newTodo);
    title.value = "";
    content.value = "";
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4">To Do List</h1>
      <form onSubmit={(e) => handleAddTodo(e)} className="mb-8">
        <input
          name="title"
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          placeholder="Title"
        />
        <input
          name="content"
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          placeholder="Content"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
        >
          추가하기
        </button>
      </form>
    </div>
  );
};

export default TodoForm;

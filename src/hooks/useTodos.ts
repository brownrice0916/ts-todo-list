import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo, TodoWithId } from "../types/types";
import { addTodo, deleteTodo, getTodos, toggleTodo } from "../apis/todos";
import { debounce } from "lodash";

const QUERY_KEY = "todos";

export const useTodos = () => {
  const queryClient = useQueryClient();
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<TodoWithId[]>({
    queryKey: [QUERY_KEY],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo: Todo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
      const previousTodos = queryClient.getQueryData<TodoWithId[]>([
        QUERY_KEY,
      ])!;

      queryClient.setQueryData([QUERY_KEY], (old: TodoWithId[]) => [
        newTodo,
        ...old,
      ]);
      return { previousTodos };
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    // },
  });

  const updateMutation = useMutation({
    mutationFn: toggleTodo,
    onMutate: async (todoId: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
      const previousTodos = queryClient.getQueryData<TodoWithId[]>([
        QUERY_KEY,
      ])!;
      const newTodos = previousTodos.map((todo) => ({
        ...todo,
        ...(todo.id === todoId && { selected: !todo.selected }),
      }));
      queryClient.setQueryData([QUERY_KEY], newTodos);
      return { previousTodos };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (todoId: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
      const previousTodos = queryClient.getQueryData<TodoWithId[]>([
        QUERY_KEY,
      ])!;
      const newTodos = previousTodos.filter((todo) => todo.id !== todoId);
      queryClient.setQueryData([QUERY_KEY], newTodos);
      return { previousTodos };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error) => {
      console.error(error.message);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    // },
  });

  const addTodoDebounced = debounce(addMutation.mutate, 500);
  const updateTodoDebounced = debounce(updateMutation.mutate, 500);
  const deleteTodoDebounced = debounce(deleteMutation.mutate, 500);

  return {
    todos,
    isLoading,
    error,
    addTodo: addTodoDebounced,
    updateTodo: updateTodoDebounced,
    deleteTodo: deleteTodoDebounced,
  };
};

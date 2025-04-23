import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [showConfirmId, setShowConfirmId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/todo?title=${search}&status=${filter}&page=${page}&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(res.data.todos);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [search, filter, page]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      await axios.post("http://localhost:5000/api/todo", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        status: "pending",
      });
      toast.success("Task added!");
    } catch (err) {
      toast.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingTodo) return;
    setLoadingId(editingTodo._id);
    try {
      await axios.put(
        `http://localhost:5000/api/todo/${editingTodo._id}`,
        editingTodo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTodos();
      setEditingTodo(null);
      toast.success("Task updated!");
    } catch (err) {
      toast.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleToggle = async (todo) => {
    setLoadingId(todo._id);
    try {
      await axios.put(
        `http://localhost:5000/api/todo/${todo._id}`,
        {
          ...todo,
          status: todo.status === "completed" ? "pending" : "completed",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTodos();
      toast.success("Status updated");
    } catch (err) {
      toast.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    setLoadingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
      toast.success("Task deleted");
    } catch (err) {
      toast.error(err);
    } finally {
      setLoadingId(null);
      setShowConfirmId(null);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">My To-Do List</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="input"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select
          className="input"
          value={filter}
          onChange={(e) => {
            setPage(1);
            setFilter(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <form onSubmit={handleAdd} className="space-y-2 mb-6">
        <input
          name="title"
          placeholder="Title"
          className="input"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          className="input"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="dueDate"
          type="date"
          className="input"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <button type="submit" className="btn" disabled={isAdding}>
          {isAdding ? <ClipLoader size={20} color="#fff" /> : "Add Task"}
        </button>
      </form>

      <ul className="space-y-3 mb-6">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold">{todo.title}</h4>
              <p>{todo.description}</p>
              <small>{new Date(todo.dueDate).toLocaleDateString()}</small>
              <p
                className={`text-sm ${
                  todo.status === "completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {todo.status}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => handleToggle(todo)}
                className="btn-sm bg-blue-500 text-white"
                disabled={loadingId === todo._id}
              >
                {loadingId === todo._id ? (
                  <ClipLoader size={14} color="#fff" />
                ) : (
                  "Toggle"
                )}
              </button>
              <button
                onClick={() => setEditingTodo(todo)}
                className="btn-sm bg-yellow-500 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => setShowConfirmId(todo._id)}
                className="btn-sm bg-red-500 text-white"
              >
                Delete
              </button>
            </div>

            {showConfirmId === todo._id && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg">
                  <p className="mb-4">
                    Are you sure you want to delete this task?
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowConfirmId(null)}
                      className="btn-sm bg-gray-400 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="btn-sm bg-red-600 text-white"
                    >
                      {loadingId === todo._id ? (
                        <ClipLoader size={14} color="#fff" />
                      ) : (
                        "Yes, Delete"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-4 items-center">
        <button
          className="btn-sm bg-gray-300"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn-sm bg-gray-300"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {editingTodo && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl mb-4 font-semibold">Edit Task</h3>
            <input
              name="title"
              className="input mb-2"
              value={editingTodo.title}
              onChange={(e) =>
                setEditingTodo({ ...editingTodo, title: e.target.value })
              }
            />
            <input
              name="description"
              className="input mb-2"
              value={editingTodo.description}
              onChange={(e) =>
                setEditingTodo({ ...editingTodo, description: e.target.value })
              }
            />
            <input
              name="dueDate"
              type="date"
              className="input mb-2"
              value={editingTodo.dueDate?.slice(0, 10)}
              onChange={(e) =>
                setEditingTodo({ ...editingTodo, dueDate: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTodo(null)}
                className="btn-sm bg-gray-400 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="btn-sm bg-green-600 text-white"
                disabled={loadingId === editingTodo._id}
              >
                {loadingId === editingTodo._id ? (
                  <ClipLoader size={14} color="#fff" />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import API from "../api/axios";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import TaskTable from "../components/TaskTable";
import TaskModal from "../components/TaskModal";
import Pagination from "../components/pagination";
import {
  addTask,
  deleteTask as deleteStoredTask,
  getTasks,
  getTaskSummary,
  resetTaskStorage,
  updateTask,
} from "../localstorage/taskStorage";

const USE_LOCAL_TEST_DATA = false;

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [summary, setSummary] = useState({
    total: 0,
    todo: 0,
    progress: 0,
    done: 0,
  });

  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    loadTasks();
  }, [page, search, statusFilter]);

  const loadTasks = async () => {
    if (USE_LOCAL_TEST_DATA) {
      const result = getTasks({ page, search, status: statusFilter });
      setTasks(result.content);
      setTotalPages(result.totalPages);
      setPage(result.page);
      setSummary(getTaskSummary());
      return;
    }

    const endpoint =
      statusFilter === "active" || statusFilter === "all"
        ? "/todo"
        : `/${statusFilter}`;
    const params = {
      page,
      ...(search.trim() ? { search: search.trim() } : {}),
    };
    const res = await API.get(endpoint, { params });
    const rows = res.data?.content ?? [];
    const visibleRows =
      statusFilter === "active"
        ? rows.filter((t) => t.status === "TODO" || t.status === "PROGRESS")
        : rows;
    setTasks(visibleRows);
    setTotalPages(res.data?.totalPages ?? 1);
    setSummary({
      total: rows.length,
      todo: rows.filter((t) => t.status === "TODO").length,
      progress: rows.filter((t) => t.status === "PROGRESS").length,
      done: rows.filter((t) => t.status === "DONE").length,
    });
  };

  const filterTasks = (status) => {
    setStatusFilter(status);
    setPage(1);
  };

  const saveTask = async (data) => {
    if (USE_LOCAL_TEST_DATA) {
      if (editData) {
        updateTask(editData.id, data);
      } else {
        addTask(data);
      }
    } else {
      if (editData) {
        await API.put(`/edittask/${editData.id}`, data);
      } else {
        await API.post("/addtask", data);
      }
    }

    setModal(false);
    setEditData(null);
    loadTasks();
  };

  const deleteTask = async (id) => {
    if (USE_LOCAL_TEST_DATA) {
      deleteStoredTask(id);
    } else {
      await API.delete(`/deletetask/${id}`);
    }
    loadTasks();
  };

  const changeStatus = async (id, status) => {
    if (USE_LOCAL_TEST_DATA) {
      updateTask(id, { status });
    } else {
      await API.put(`/edittask/${id}`, { status });
    }
    loadTasks();
  };

  return (
    <main className="page-shell">
      <div className="dashboard-card">
        <Header
          summary={summary}
          testMode={USE_LOCAL_TEST_DATA}
          resetDemo={() => {
            if (!USE_LOCAL_TEST_DATA) return;
            resetTaskStorage();
            setSearch("");
            setStatusFilter("active");
            setPage(1);
            loadTasks();
          }}
        />

        <SearchFilter
          search={search}
          setSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          statusFilter={statusFilter}
          filterTasks={filterTasks}
          openModal={() => {
            setEditData(null);
            setModal(true);
          }}
        />

        <TaskTable
          tasks={tasks}
          deleteTask={deleteTask}
          editTask={(t) => {
            setEditData(t);
            setModal(true);
          }}
          changeStatus={changeStatus}
        />

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />

        <TaskModal
          isOpen={modal}
          close={() => {
            setEditData(null);
            setModal(false);
          }}
          saveTask={saveTask}
          editTask={editData}
        />
      </div>
    </main>
  );
}
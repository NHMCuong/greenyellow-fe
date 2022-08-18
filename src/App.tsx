import { useEffect, useState } from "react";

import TodoForm from "./components/TodoForm";
import TodoTaskList from "./components/TodoTaskList";

import { Col, Layout, Row } from "antd";

import { getAllTaskList } from "./api/task";
import "./App.scss";
import { TaskList } from "./type/task";

function App() {
  const [taskList, setTaskList] = useState<TaskList[]>([]);
  const [mode, setMode] = useState("addTask");
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    getAllTaskList().then((res) => {
      if (res.code === 200) {
        setTaskList(res.data);
      }
    });
  }, []);

  return (
    <Layout className="h-full">
      <Layout.Header>
        <div className="text-white text-[30px] font-bold">
          Task List Management
        </div>
      </Layout.Header>
      <Layout.Content className="p-[50px] m-0">
        <Row gutter={[16, 36]}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <TodoForm
              mode={mode}
              setMode={setMode}
              currentTask={currentTask}
              setTaskList={setTaskList}
            />
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <TodoTaskList
              taskList={taskList}
              setTaskList={setTaskList}
              setMode={setMode}
              setCurrentTask={setCurrentTask}
            />
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer>@This test have done by Cuong Nguyen</Layout.Footer>
    </Layout>
  );
}

export default App;

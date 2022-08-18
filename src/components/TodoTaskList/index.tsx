import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, List, Tag } from "antd";
import { deleteTask, getAllTaskList, updateTask } from "../../api/task";

const TodoTaskList = ({
  taskList,
  setTaskList,
  setMode,
  setCurrentTask,
}: any) => {
  /**
   * Method click to complete task
   */
  const handleCompleteTask = (task: any) => {
    // Call API
    console.log(task);
    let updatedTaskStatus = {
      category_id: task.categoryId,
      name: task.name,
      completed: !task.completed,
    };

    updateTask(task.id, updatedTaskStatus).then(() => {
      getAllTaskList().then((res) => {
        if (res.code === 200) {
          setTaskList(res.data);
        }
      });
    });
  };

  /**
   * Method delete a task
   */
  const handleDeleteTask = (taskId: number) => {
    // Call API to delete task
    deleteTask(taskId).then((res) => {
      if (res.code === 200) {
        getAllTaskList().then((res) => {
          setTaskList(res.data);
        });
      }
    });
    // After that call API to fetch data again
  };
  return (
    <>
      <div className="text-center text-[18px] font-bold">Task list</div>
      <List
        itemLayout="horizontal"
        dataSource={taskList}
        renderItem={(task: any) => (
          <List.Item>
            <Checkbox
              className="mr-3"
              checked={task.completed}
              onChange={() => handleCompleteTask(task)}
            ></Checkbox>
            <List.Item.Meta
              title={
                <div className="flex">
                  {task.completed === false && <Tag>Ongoing</Tag>}
                  {task.completed === true && <Tag color="blue">Task Done</Tag>}
                  <div>{task.name}</div>
                </div>
              }
              description={task.category_id}
            />
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setMode("editTask");
                setCurrentTask(task);
              }}
            />
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteTask(task.id)}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default TodoTaskList;

import { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import axios from "axios";
import { Task } from "../../type/task";
import { Category, CategoryList } from "../../type/category";
import { addTask, getAllTaskList, updateTask } from "../../api/task";
import { addCategory, getCategory } from "../../api/category";

const TodoForm = ({
  mode,
  editValue,
  currentTask,
  setTaskList,
  setMode,
}: any) => {
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState<CategoryList>({
    mode: "",
    data: [],
  });
  const [confirm, setConfirm] = useState(false);
  const [formValue, setFormValue] = useState<Task>();

  useEffect(() => {
    if (mode === "editTask") {
      form.setFieldsValue({
        name: currentTask.name,
        category_id: currentTask.categoryId,
      });
    }
  }, [mode]);

  useEffect(() => {
    if (categoryList.data.length > 0 && categoryList.mode === "random") {
      form.setFieldsValue({
        category_id: categoryList.data[categoryList.data.length - 1].id,
      });
    }
  }, [categoryList]);

  useEffect(() => {
    getCategory().then((res) => {
      if (res.code === 200) {
        setCategoryList({ mode: "", data: res.data });
      }
    });
  }, []);

  /**
   * Method handle get random task
   */
  const handleOnRandom = async () => {
    await axios.get("http://www.boredapi.com/api/activity/").then((res) => {
      let randomTask: Task = {
        name: res.data.activity,
        category_id: res.data.key,
      };
      if (res.status === 200) {
        addCategory({
          id: Number(res.data.key),
          name: res.data.type,
        }).then((res: any) => {
          if (res.status === 200) {
            getCategory().then((res: any) => {
              setCategoryList({ mode: "random", data: res.data });
              form.setFieldsValue({
                name: randomTask.name,
              });
            });
          }
        });
      }
    });
  };

  /**
   * Method handle open confirmation pop-up
   * @param formValue
   */
  const handleOnSubmitForm = (formValue: Task) => {
    setFormValue(formValue);
    setConfirm(true);
  };

  /**
   * Method handle add task
   */
  const handleAddTask = () => {
    addTask(formValue).then((res: any) => {
      if (res.code === 200) {
        setConfirm(false);
        form.resetFields();
        getAllTaskList().then((res: any) => {
          setTaskList(res.data);
        });
      }
    });
  };

  /**
   * Method handle add task
   */
  const handleUpdateTask = () => {
    let updatedTask = {
      category_id: form.getFieldValue("category_id"),
      name: form.getFieldValue("name"),
      completed: currentTask.completed,
    };

    console.log("updatedTask", updatedTask);

    updateTask(currentTask.categoryId, updatedTask).then((res: any) => {
      console.log("res", res);
      getAllTaskList().then((res) => {
        if (res.code === 200) {
          setTaskList(res.data);
        }
      });
    });
    setConfirm(false);
    setMode("addTask");
    form.resetFields();
  };

  return (
    <>
      <Form form={form} onFinish={handleOnSubmitForm}>
        <Row gutter={16}>
          <Col span={24}>
            <label htmlFor="" className="font-bold">
              Task Name
            </label>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your task name!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <label htmlFor="" className="font-bold">
              Category
            </label>
            <Form.Item
              name="category_id"
              rules={[{ required: true, message: "Please select category!" }]}
            >
              <Select allowClear size="large">
                {categoryList.data &&
                  categoryList.data.map((category: Category) => (
                    <Fragment key={category.id}>
                      <Select.Option value={category.id}>
                        {category.name}
                      </Select.Option>
                    </Fragment>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <div className="flex justify-between w-full">
              <Button
                onClick={handleOnRandom}
                size="large"
                className="rounded-lg w-3/12"
              >
                Random
              </Button>
              {mode === "addTask" ? (
                <Button
                  htmlType="submit"
                  size="large"
                  className="rounded-lg w-3/12"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  htmlType="submit"
                  size="large"
                  className="rounded-lg w-3/12"
                >
                  Update
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Form>

      <Modal
        title={
          mode === "addTask"
            ? "Do you want to add new task?"
            : "Do you want to update this task?"
        }
        visible={confirm}
        onOk={mode === "addTask" ? handleAddTask : handleUpdateTask}
        onCancel={() => setConfirm(false)}
      />
    </>
  );
};

export default TodoForm;

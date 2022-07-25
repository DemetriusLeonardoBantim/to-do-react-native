import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let newTaskObject =  {
      title: newTaskTitle,
      done:false,
      id: Math.floor(Math.random() * 1000)
    }
    setTasks(oldTask => [...oldTask, newTaskObject])
  }

  function handleToggleTaskDone(id: number) {
    const doneTask = tasks.map(task => task.id === id ? {
      ...task, done: !task.done
    } : task)
    setTasks(doneTask)
  }
 
  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
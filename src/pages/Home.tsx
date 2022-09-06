import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(!newTaskTitle) return
    let newTaskObject =  {
      id: new Date().getTime(),
      title: newTaskTitle,
      done:false,
      edit:false
    }
    setTasks(oldTask => [...oldTask, newTaskObject])
  }

  function handleEditTask(id: number) { 
    const updatedTasks = tasks.map(task => ({...task}))
    const foundItem = updatedTasks.find(item => item.id === id)
    
    if(!foundItem) return
  
    foundItem.edit = !foundItem.edit
    console.log(updatedTasks)
    setTasks(updatedTasks)
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}))
    
    const foundItem = updatedTasks.find(item => item.id === id)

    if(!foundItem) return

    foundItem.done = !foundItem.done
    setTasks(updatedTasks)
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
        tasks = {tasks} 
        toggleTaskDone = {handleToggleTaskDone}
        removeTask = {handleRemoveTask} 
        editTask = {handleEditTask}
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
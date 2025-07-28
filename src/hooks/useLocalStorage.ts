type SelectedTask = {
  task: string
  completed: boolean
}

type TaskCache = SelectedTask | string[]

const useLocalStorage = () => {
  const setCachedTask = (tasks: TaskCache, key: string) => {
    try {
      localStorage.setItem(key, JSON.stringify(tasks))
    } catch (error) {
      console.error("Failed to save to localStorage:", error)
    }
  }

  const getCachedTasks = (key: string): TaskCache | null => {
    try {
      const cached = localStorage.getItem(key)
      return cached ? JSON.parse(cached) : null
    } catch (error) {
      console.error("Failed to get from localStorage:", error)
      return null
    }
  }

  const removeTask = (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("Failed to remove from localStorage:", error)
    }
  }

  const updateCompletedTasks = (completedTask: string) => {
    try {
      const existing = (getCachedTasks("completedTasks") as string[]) || []
      if (!existing.includes(completedTask)) {
        const updated = [...existing, completedTask]
        setCachedTask(updated, "completedTasks")
      }
    } catch (error) {
      console.error("Failed to update completed tasks:", error)
    }
  }

  return { setCachedTask, getCachedTasks, removeTask, updateCompletedTasks }
}

export { useLocalStorage, type SelectedTask }

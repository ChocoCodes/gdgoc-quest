import { QuestBoard, QuestCard } from './components/components'
import { useRandomTasks, useLocalStorage, type SelectedTask } from './hooks/hooks'
import { useState, useEffect } from 'react'

function App() {
  const { generatedTasks } = useRandomTasks()
  const { setCachedTask, getCachedTasks, removeTask } = useLocalStorage()
  const [finalTasks, setFinalTasks] = useState<string[]>([])
  const [selectedTask, setSelectedTask] = useState<SelectedTask | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const cachedGenerated = getCachedTasks('generatedTasks')
    const cachedSelected = getCachedTasks('selectedTask')
    if (typeof cachedSelected === 'object' && !Array.isArray(cachedSelected)) {
      if(cachedSelected && !cachedSelected.completed) {
        setSelectedTask(cachedSelected)
        setVisible(true)
      }
    }

    if (cachedGenerated && Array.isArray(cachedGenerated)) {
      setFinalTasks(cachedGenerated)
    } else if (generatedTasks.length > 0) {
      setCachedTask(generatedTasks, 'generatedTasks')
      setFinalTasks(generatedTasks)
    }
  }, [generatedTasks])

  const handleClick = (task: string) => {
    console.log(task)
    setSelectedTask({
      task: task,
      completed: false
    })
    if(selectedTask) {
      setCachedTask(selectedTask, 'selectedTask')
    }
    setVisible(!visible)
  }

  const handleComplete = (task: SelectedTask) => {
    const completedTask: SelectedTask = {...task, completed: true}
    setSelectedTask(completedTask)
    console.log(task)
    if (task.completed) { 
      removeTask('selectedTask') 
      setSelectedTask(null)
      console.log(task ? task : 'Cleared')
    }
    setVisible(false);
  }

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-[url('/ui/background.png')] bg-no-repeat bg-cover bg-center opacity-95"> 
      <QuestBoard tasks={ finalTasks } onTaskClick={ handleClick } />
      {(visible && selectedTask) &&  (
        <QuestCard task={selectedTask} onComplete={ handleComplete } onClose={() => setVisible(false)} />
      )}
    </main>
  )
}

export default App

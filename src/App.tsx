import { useRandomTasks } from './hooks/useRandomTasks'

function App() {
  const { selectedTasks } = useRandomTasks()
  console.log(selectedTasks)
  return (
    <> 
      {selectedTasks.map(task => (
          <p key={task} className="font-bold text-2xl text-center font-jacquard">{task}</p>
        ))
      }
    </>
  )
}

export default App

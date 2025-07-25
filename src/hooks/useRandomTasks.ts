import { useState, useEffect } from 'react'

const tasks = [
  "task1",
  "task2",
  "task3",
  "task4",
  "task5"
]

const useRandomTasks = () => {
    const [selectedTasks, setSelectedTasks] = useState<string[]>([])
    const NUM_TASKS = 3
    useEffect(() => {
        const selectTasks = () => {
            const tmp: string[] = []
            while (tmp.length < NUM_TASKS) {
                const index = Math.floor(Math.random() * tasks.length)
                if(!tmp.includes(tasks[index])) {
                    tmp.push(tasks[index])
                }
            }
            console.log(tmp)
            setSelectedTasks(tmp)
        }
        selectTasks()
    }, [])
    return { selectedTasks, setSelectedTasks }
}

export { useRandomTasks }


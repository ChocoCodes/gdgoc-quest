import { useEffect, useState } from 'react'

const useLocalStorage = () => {
    const [task, setTask] = useState<string | null>(null);

    useEffect(() => {
        const cachedTask = localStorage.getItem('task')
        if(cachedTask) {
            setTask(JSON.parse(cachedTask))
        }
    }, [])

    const cacheTask = (newTask: string) => {
        setTask(newTask)
        localStorage.setItem('task', newTask)
    }

    return { task, setTask, cacheTask }
}

export { useLocalStorage }
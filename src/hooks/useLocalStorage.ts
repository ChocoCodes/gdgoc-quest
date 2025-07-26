type SelectedTask = {
    task: string;
    completed: boolean;
} 

type TaskCache = SelectedTask | string[];

const useLocalStorage = () => {

    const setCachedTask = (tasks: TaskCache, key: string) => {
        return localStorage.setItem(key, JSON.stringify(tasks))
    }

    const getCachedTasks = (key: string): TaskCache | null => {
        const cached = localStorage.getItem(key);
        return cached ? JSON.parse(cached) : null;
    }

    const removeTask = (key: string) => {
        localStorage.removeItem(key)
    }

    return { setCachedTask, getCachedTasks, removeTask }
}

export { useLocalStorage, type SelectedTask }
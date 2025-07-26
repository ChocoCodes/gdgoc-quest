import type { SelectedTask } from "../hooks/hooks"

interface QuestCardProps {
    task: SelectedTask
    onComplete: (task: SelectedTask) => void
    onClose: () => void
}

const QuestCard = ({ task, onComplete, onClose }: QuestCardProps) => {
    return (
        <div className="fixed inset-0 backdrop-blur-xs bg-black/10 flex items-center justify-center z-50">
            <div className="bg-[url('/ui/parchement.png')] bg-center bg-no-repeat w-4/5 h-50 py-6 text-muted-brown/90 text-md font-jacquard rounded-xl">
                <p className="px-6">{task.task}</p>
                <button onClick={() => onComplete(task)}></button>
                <button onClick={() => onClose()}>&times;</button>
            </div>
        </div>
    )
}


export { QuestCard }
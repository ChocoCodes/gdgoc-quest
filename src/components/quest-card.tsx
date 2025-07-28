import type { SelectedTask } from "../hooks/hooks"

interface QuestCardProps {
    task: SelectedTask
    onComplete: (task: SelectedTask) => void
    onClose: () => void
}

const QuestCard = ({ task, onComplete, onClose }: QuestCardProps) => {
    return (
        <div className="fixed inset-0 backdrop-blur-xs bg-black/10 flex items-center justify-center z-50">
            <div className="bg-[url('/ui/parchement.png')] bg-center bg-cover bg-no-repeat w-4/5 h-50 py-6 text-muted-brown/90 text-md font-jacquard rounded-xl">
                <p className="px-8 py-2 text-center">{task.task}</p>
                <div className="flex w-[25%] mx-auto justify-between items-center">
                    <button onClick={() => onClose()}>
                        <img src="/ui/exit.png" alt="Exit" className="w-6 h-6 pixelated cursor-pointer hover:-translate-y-1 transform transition-transform duration-300 ease-in-out" />
                    </button>
                    <button onClick={() => onComplete(task)}>
                        <img src="/ui/check.png" alt="Complete" className="w-6 h-8 pixelated cursor-pointer hover:-translate-y-1 transform transition-transform duration-300 ease-in-out" />
                    </button>
                </div>
            </div>
        </div>
    )
}


export { QuestCard }
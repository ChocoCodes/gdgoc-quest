interface QuestBoardProps {
    tasks: string[]
    onTaskClick: (task: string) => void
}

const QuestBoard = ({ tasks, onTaskClick }: QuestBoardProps) => {
    return (
        <div className="w-[90%] h-3/5 flex flex-col gap-5 mx-auto items-center bg-[url('/ui/parchement.png')] bg-no-repeat bg-cover bg-center py-12 text-muted-brown/80">
            <p className="text-center font-jacquard text-3xl py-2 font-bold border-b-4 border-muted-brown/80 mx-auto">Quest</p>
            <div className="flex flex-col gap-2">
                {tasks.map(task => (
                    <div key={task} className="flex w-full justify-between px-8 py-1">
                        <p className="font-bold text-xs text-left font-jacquard w-[85%]">{task}</p>
                        <button onClick={ () => onTaskClick(task) } className="w-4 h-4">
                            <img src="/ui/checkbox-pending.png"></img>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}


export { QuestBoard }
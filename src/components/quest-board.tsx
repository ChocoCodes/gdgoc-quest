interface QuestBoardProps {
    tasks: string[]
    onTaskClick: (task: string) => void
}

const QuestBoard = ({ tasks, onTaskClick }: QuestBoardProps) => {
    return (
        <div className="w-[90%] lg:w-3/5 h-3/5 lg:h-4/5 flex flex-col gap-5 lg:gap-10 mx-auto items-center bg-[url('/ui/parchement.png')] bg-no-repeat bg-cover lg:bg-contain lg:scale-120 bg-center py-12 text-muted-brown/70">
            <p className="text-center font-jacquard text-3xl lg:text-5xl py-3 font-bold border-b-4 border-muted-brown/80 mx-auto">Quest</p>
            <div className="flex flex-col">
                {tasks.map(task => (
                    <div key={task} className="flex w-[75%] lg:w-[50%] justify-between py-1 lg:px-2 mx-auto">
                        <p className="font-bold text-md text-left font-jacquard w-[85%]">{task}</p>
                        <button onClick={ () => onTaskClick(task) }>
                            <img src="/ui/checkbox-pending.png" className="w-4 h-4 opacity-70 pixelated" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}


export { QuestBoard }
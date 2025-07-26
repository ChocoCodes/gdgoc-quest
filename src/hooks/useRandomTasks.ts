import { useState, useEffect } from 'react'

const tasks = [
	"Recite ye Sacred Scroll of Sir La Salle’s Mission and Vision.",
	"Seek and deliver seven enchanted stones from the College Plaza, with moving portrait (video) as proof of thy feat.",
	"Reveal the last whispers of thy search scroll (student account search history).",
	"Chant the cursed rune known as the Backwards Alphabet, without flaw.",
	"Name the many relics of the Digital Kingdom of Google, all that yet breathe and function.",
	"Unveil a hidden gift or talent, long concealed from the realm",
	"Don the mantle of a noble officer and proclaim the glory of GDG to a wandering soul.",
	"Lift thy comrade upon thy back, and carry them hence (piggyback ride).",
	"Speak the sacred Preamble, word for word, as passed down through generations.",
	"Prove thy vigor with twenty jumps of the jack or twenty pushings of the earth.",
	"Perform the acrobatic spin of valor, known among peasants as the Cartwheel.",
	"Ascend and seize the Star of Fortune, the Grand Prize of legend. (Gemini star cut out)",
	"Spit a bard’s verse, a rap bar to please the crowd and awaken the muses.",
	"Stride with style and pride, showcasing thy finest Runwalk of the realm." ,
	"Uncover the Rune that was Lost, the Missing Letter, and claim the Grand Prize foretold. (Go_gle)"
]

const useRandomTasks = () => {
    const [generatedTasks, setGeneratedTasks] = useState<string[]>([])
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
            setGeneratedTasks(tmp)
        }
        selectTasks()
    }, [])
    return { generatedTasks, setGeneratedTasks }
}

export { useRandomTasks }


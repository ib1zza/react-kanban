import React from "react";
import s from "../../styles/Block.module.css"

import TaskList from '../TaskList/TaskList';


const Ready = ({title, tasks, onAdd, backloglist }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    console.log(backloglist)


    const handleSelect = (e) => {
        console.log(e.target.value);
        onAdd(e.target.value);
        setIsOpen(false);
    }

    return (
        <div className={s.container}>
            <h6 className={s.title}>{title}</h6>
            <TaskList tasks={tasks}/>

            {isOpen ? (
                      <div className={s.input}>
                        <select defaultValue={"default"} onChange={handleSelect}>
                            <option value="default" disabled >Выберите задачу</option>
                            {
                                backloglist.map(item => {
                                    return <option key={item.id} value={item.id}>{item.title}</option>
                                })
                            }
                        </select> 
                   
                   
                  </div>
                 )
                 : 
                 (<button className={s.button} onClick={() => setIsOpen(true)} disabled={!backloglist.length}>
                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M14 7H9V2C9 1.448 8.552 1 8 1C7.448 1 7 1.448 7 2V7H2C1.448 7 1 7.448 1 8C1 8.552 1.448 9 2 9H7V14C7 14.552 7.448 15 8 15C8.552 15 9 14.552 9 14V9H14C14.552 9 15 8.552 15 8C15 7.448 14.552 7 14 7Z" fill="#5E6C84"/>
                 </svg>
                 Add card
                 </button>)
            }
        </div>
    )
}

export default Ready;
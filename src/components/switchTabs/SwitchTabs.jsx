import { useState } from "react"
import "./style.scss"

const SwitchTabs = ({ data, onTabChange }) => {
    const [selctedTab,setSelctedTab] = useState(0)
    const [left,setLeft] = useState(0)

    const activeTab=(tab,index)=>{
        setLeft(index*100)
        setTimeout(()=>{
            setSelctedTab(index)
        },300)
        onTabChange(tab,index)
    }

  return (
    <div className="switchingTabs">
        <div className="tabItems">
            {data.map((tab,index)=>(
                <span 
                key={index} 
                className={`tabItem ${selctedTab === index ? 'active':" "} `} 
                onClick={()=>activeTab(tab,index)}
                >{tab}</span>
            ))}
            <span  className="movingBg" style={{left}}/>
        </div>
    </div>
  )
}

export default SwitchTabs
import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../Sidebar'
import * as CanvasJs from "@canvasjs/charts";
import CanvasJSReact from '@canvasjs/react-charts';

const Dashboard = () => {
    let Canvasjs = CanvasJSReact.CanvasJS
    let CanvasjsChart = CanvasJSReact.CanvasJSChart
    const [ChartId, setChartId] = useState(null)
    const [CurrentTab, setCurrentTab] = useState(0)
    const options = {
        title: {
            text: "Column Chart"
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "", y: 10 },
                { label: "", y: 15 },
                { label: "", y: 25 },
                { label: "", y: 30 },
                { label: "", y: 28 }
            ]
        }]
    }

    const OptionForMyskill = {
        title: {
            text: "Skill Chart"
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "", y: 10 },
                { label: "", y: 15 },
                { label: "", y: 25 },
                { label: "", y: 30 },
                { label: "", y: 28 }
            ]
        }]
    }

    const TabBox = useRef([
        (<CanvasjsChart key={'chart'} options={options}
        /* onRef = {ref => this.chart = ref} */
        />),
        (<CanvasjsChart key={'myskill'} options={OptionForMyskill}
        /* onRef = {ref => this.chart = ref} */
        />),
        (<div key={'profile'} className={`w-[500px] py-[10px] px-[20px]`} id='profile'>
            profile
        </div>)

    ])



    const RenderTime = function () {
        // setChartId(TabBox.current[CurrentTab].props.id)
        setChartId("container")
    }

    useEffect(() => { }, [ChartId])
    useEffect(() => RenderTime, [])

    // set curretchart
    const ChangeChartToMyskill = () => {
        setCurrentTab(1)
        // setChartId("myskill")
    }

    // CHANGE TO CHART
    const ChangeChart = () => {
        setCurrentTab(0)
    }

    const ChangeChartToProfile = () => {
        setCurrentTab(2)
        // setChartId("myskill")
    }

    return (
        <div className="App">
            {/* <div className="sidebar sidebar-cm">
                <Sidebar />
            </div> */}
            <div className="body-content body-cm">
                <div>
                    <div className="Header">
                        <h1 className="heading">Dashboard</h1>
                    </div>
                    <div className="form">

                    </div>
                    <div className="Gallery">
                        <div className={`min-w-[500px] min-h-[400px] border border-[#ccc]`}>
                            <div className={`w-full h-auto flex items-center justify-start border border-[#ccc] `}>
                                <button className={`px-[10px] py-[5px] text-xl ${CurrentTab == 1 && "bg-[#e7e7e7]"}`} onClick={() => setCurrentTab(1)}>Skill</button>
                                <button className={`px-[10px] py-[5px] text-xl ${CurrentTab == 0 && "bg-[#e7e7e7]"}`} onClick={() => setCurrentTab(0)}>Chart</button>
                                <button className={`px-[10px] py-[5px] text-xl ${CurrentTab == 2 && "bg-[#e7e7e7]"}`} onClick={() => setCurrentTab(2)}>Profile</button>
                            </div>
                            {TabBox.current[CurrentTab]}
                        </div>




                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
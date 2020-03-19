import React from 'react'

const Toggle = (props) => {
    return (
        <div id="toggleContainer" onClick={(e) => {
            if (e.target.nodeName === "SPAN")
                props.onToggle(!props.isChecked)
        }}>
            <label htmlFor="togglebox" className="switch-toggle">
                <input id="togglebox" type="checkbox" checked={props.isChecked}
                />
                <span className={`slider-toggle round-toggle`} />
            </label>
        </div>
    )
}


export default React.memo(Toggle);
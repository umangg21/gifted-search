import React from 'react'

const Toggle = (props) => <div onClick={(e) => {
    if (e.target.nodeName === "SPAN")
        props.onToggle(!props.isChecked)
}} {...props}>
    <label htmlFor="togglebox" className="switch-toggle">
        <input id="togglebox" type="checkbox" checked={props.isChecked}
        />
        <span className={`slider-toggle round-toggle`} />
    </label>
</div>


export default React.memo(Toggle);
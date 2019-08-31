import React from "react";
import PropTypes from "prop-types";
import { SearchIcon } from "../../assets/icons";

const SearchInput = (props) => <div>
    <div className="form-group">
        <input className={"searchBox"}
            title="Search typing to search giphy"
            autoComplete="off"
            disabled={props.disabled}
            readOnly={props.readOnly}
            placeholder={props.placeholder}
            type={props.type}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            ref={props.ref}
            name={props.name}
            autoFocus={props.autoFocus}
            value={props.value}
            minLength={props.minLength}
            maxLength={props.maxLength}
            onChange={(e) => {
                const { state } = props.context;
                state[props.name] = e.target.value;
                state["offset"] = 0;
                props.context.setState(state);
                props.context.forceUpdate();
                if (props.afterInput)  //for comparing old and new values
                    props.afterInput(props.value, e.target.value, e);
            }}
            pattern={props.pattern}
            required={!props.isNotRequired} />

        <div className="searchIcon">
            <SearchIcon color={"#888"} />
        </div>
    </div>

</div>;

export default React.memo(SearchInput);

SearchInput.propTypes = {
    className: PropTypes.string,
    context: PropTypes.object,
    placeHolder: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    pattern: PropTypes.string,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    beforeInput: PropTypes.func,
    afterInput: PropTypes.func,
    dontSaveInPayload: PropTypes.bool,
    autoFocus: PropTypes.bool
};
import "./Button.css"

export default props => {

    let classes = 'button '
    classes += props.buttonAC ? 'buttonAC' : '' 
    classes += props.button0 ? 'button0' : '' 
    classes += props.operation ? 'operation' : '' 

    return (
        <button
        onClick={function (_) { props.click && props.click(props.label)}}
            className={classes}
        >{props.label}</button>
    )

}
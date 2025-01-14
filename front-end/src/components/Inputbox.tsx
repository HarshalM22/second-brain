interface props {
    type: string,
    placeholder: string,
    label: string,
    referance? :  any  
}
export function Inputbox(props: props) {
    return (
        <div className="flex flex-col font-bold">
            <label>{props.label}</label>
            <input className="rounded-sm border " type={props.type} placeholder={props.placeholder} ref={props.referance} />
        </div>
    )
}  
interface props {
    type: string,
    placeholder: string,
    label: string,
    onChange: (value: string) => void
}
export function Inputbox(props: props) {
    return (
        <>
            <label>{props.label}</label>
            <input className="rounded-sm " type={props.type} placeholder={props.placeholder} onChange={(e) => { props.onChange(e.target.value) }} />
        </>
    )
}

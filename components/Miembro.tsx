export default function Miembros(props: {
    displayName: string,
    activePlaytime: string,
    activityIndex: string,
    registered: string,
    primaryGroup: string,
    geolocation: string
    }) {
    return (
        <li className="mt-4">
            <div className="underline">{props.displayName}</div>
            <ul>
                <li>Active Playtime: {props.activePlaytime}</li>
                <li>Activity Index: {props.activityIndex}</li>
                <li>Registered: {props.registered}</li>
                <li>Primary Group: {props.primaryGroup}</li>
                <li>Geolocation: {props.geolocation}</li>
            </ul>
        </li>
    );
}
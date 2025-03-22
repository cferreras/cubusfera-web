"use client";

export default function OnlineStatus({ isOnline }: { isOnline: boolean }) {
    if (!isOnline) return null;

    return (
        <div className="relative">
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
            </div>
        </div>
    );
}
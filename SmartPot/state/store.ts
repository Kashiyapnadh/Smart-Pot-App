import { Store } from "pullstate";

export const IPAddress = new Store({
    IPAddress:"192.168.1.5:8000"
})

export const LoadingState = new Store({
    isLoaded:true
})
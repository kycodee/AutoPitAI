import React, {SetStateAction} from "react";



export interface YearsListProps {
    years: Year[]
}

export interface Year {
    ModelYear: string,
    VehicleID: number
}

export interface AISearchBarProps {
    currentCarName: string
}


export interface ComponentProps extends YearsListProps {
    changeCarName: React.Dispatch<SetStateAction<string>>; // Setter function for state
}

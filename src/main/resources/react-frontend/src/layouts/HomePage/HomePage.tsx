import {ExploreTopCoffees} from "./Components/ExploreTopCoffees";
import {Carousel} from "./Components/Carousel";
import {Heroes} from "./Components/Heroes";
import {MacguffinServices} from "./Components/MacguffinServices";
import React from "react";

export const HomePage = () => {
    return (
        <>
            <ExploreTopCoffees/>
            <Carousel/>
            <Heroes/>
            <MacguffinServices/>
        </>
    );
}
import React from "react";
import {ItemProps} from "../../Interfaces/Interface";

export default class Item extends React.Component<ItemProps> {
    render() {
        const { title, image } = this.props.item;

        return (
            <div className={"item"}>
                <div className={"imgAndBackground-container"}>
                    <div className={"img-background"}/>
                    <div className={"img-container"}>
                        <img src={image} alt={title} />
                    </div>
                </div>
                <p>{title}</p>
            </div>
        );
    }
}
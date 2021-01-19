import React from "react";
import {ListProps} from "../../Interfaces/Interface";
import Item from "../Item/Item";

export default class List extends React.Component<ListProps> {
    render() {
        const { items, title } = this.props.list;
        return (
            <div className={"list"}>
                <h2>{title}</h2>
                <div className={"item-container"}>
            {items.map((item) => (
                    <Item item={item} key={item.id} />
    ))}
        </div>
        </div>
    );
    }
}
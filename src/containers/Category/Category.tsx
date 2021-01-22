import React from "react";
import getCategory from "../../api/fetch";
import {CategoryStates, CategoryType, ListType} from "../../Interfaces/Interface";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";
import List from "../List/List";

export default class Category extends React.Component<{}, CategoryStates> {
    state: CategoryStates = {
        category: {
            title: "",
            description: "",
            lists: []
        },
        filtedLists: []
    };

    handleFilterList = (filtedLists: ListType[]): void => {
        this.setState({
            filtedLists
        });
    };

    async componentDidMount() {
        const category = await getCategory<CategoryType>();
        this.setState({
            category,
            filtedLists: category.lists
        });
    }

    render() {
        const { title, description, lists } = this.state.category;
        const { filtedLists } = this.state;
        return (
            <div className={"category-container"}>
                <p className={"category-title"}>
                    <strong>{title}</strong>
                </p>
                <p>{description}</p>
                <SearchAndFilter
                    lists={lists}
                    handleFilterList={this.handleFilterList}
                />
                <div className={"list-container"}>
                    {filtedLists.map((list) => (
                        <List list={list} key={list.id} />
                    ))}
                </div>
            </div>
        );
    }
}
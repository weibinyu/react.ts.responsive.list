import React, {ChangeEvent} from "react";
import {SearchAndFilterProps, SearchAndFilterState} from "../../Interfaces/Interface";


export default class SearchAndFilter extends React.Component<
    SearchAndFilterProps,
    SearchAndFilterState
    > {
    state: SearchAndFilterState = {
        lists: [],
        currentlySearch: "",
        searchValue: "",
        prevSearchNames: [],
        showFilters: false,
        showSearchHistory: false,
        filterOutLists: []
    };

    componentDidUpdate() {
        if (this.state.lists.length !== 0 || this.state.filterOutLists.length !== 0)
            return;
        const { lists } = this.props;
        const seachNameStored = sessionStorage.getItem("prevSearchNames");
        this.setState({
            lists: lists,
            prevSearchNames:
                seachNameStored !== null ? JSON.parse(seachNameStored) : []
        });
    }

    handleSearch = () => {
        let lists = [...this.state.lists];
        const { currentlySearch } = this.state;

        lists = lists.map((list) => {
            return {
                ...list,
                items: list.items.filter((item) =>
                    item.title.toLowerCase().includes(currentlySearch.toLowerCase())
                )
            };
        });
        this.props.handleFilterList(lists);
    };

    managePreviousSearch() {
        const { currentlySearch, prevSearchNames } = this.state;

        if (currentlySearch === "") return;
        let temp = [currentlySearch, ...prevSearchNames];
        if (prevSearchNames.length < 10) {
            this.setState({
                prevSearchNames: temp
            });
        } else {
            temp = temp.slice(0, 10);
            this.setState({
                prevSearchNames: temp
            });
        }
        sessionStorage.setItem("prevSearchNames", JSON.stringify(temp));
    }

    handleFilter = (event: ChangeEvent) => {
        const { name } = event.target as HTMLInputElement;
        let filterOutLists = [...this.state.filterOutLists];
        let lists = [...this.props.lists];

        const exists = filterOutLists.includes(name);
        if (exists) {
            filterOutLists = filterOutLists.filter((list) => list !== name);
        } else {
            filterOutLists.push(name);
        }

        lists = lists.filter((list) => !filterOutLists.includes(list.title));

        this.setState(
            {
                filterOutLists,
                lists
            },
            () => {
                this.handleSearch();
            }
        );
    };

    render() {
        let { lists } = this.props;
        const {
            showFilters,
            searchValue,
            prevSearchNames,
            showSearchHistory,
            filterOutLists
        } = this.state;
        return (
            <div className={"searchFilter-container"}>
            <div className={"search-container"}>
            <input
                className={"search-field"}
        value={searchValue}
        placeholder={"search field"}
        onChange={(event) => {
            this.setState({ searchValue: event.target.value });
        }}
        onClick={() => {
            this.setState({ showSearchHistory: !showSearchHistory });
        }}
        onBlur={() => {
            this.setState({ showSearchHistory: false });
        }}
        />
        {showSearchHistory && (
            <div className={"search-history-container"}>
                {prevSearchNames.map((searchName, index) => (
                        <div
                            key={index}
                    onMouseDown={() => {
            this.setState({ searchValue: searchName });
            this.setState({ showSearchHistory: true });
        }}
            onMouseUp={() => {
            this.setState({ showSearchHistory: !showSearchHistory });
        }}
        >
            <label>{searchName}</label>
            </div>
        ))}
            </div>
        )}
        <button
            onClick={(event) => {
            event.preventDefault();
            this.setState(
                {
                    currentlySearch: searchValue,
                    searchValue: ""
                },
                () => {
                    this.managePreviousSearch();
                    this.handleSearch();
                }
            );
        }}
    >
        Search
        </button>
        </div>

        <div className={"filter-container"}>
        <div
            className={"filter-title"}
        onClick={() => this.setState({ showFilters: !showFilters })}
    >
        <label>filters</label>
        </div>

        {showFilters && (
            <div className={"filter-options"}>
                {lists.map((list) => (
                        <div key={list.id}>
                        <input
                            type="checkbox"
                    id={list.id + ""}
                    name={list.title}
                    defaultChecked={!filterOutLists.includes(list.title)}
            onChange={(event) => {
            this.handleFilter(event);
        }}
            />
            <label>{list.title}</label>
            </div>
        ))}
            </div>
        )}
        </div>
        </div>
    );
    }
}
export interface SearchAndFilterProps {
    lists: ListType[];
    handleFilterList: Function;
}

export interface SearchAndFilterState {
    lists: ListType[];
    searchValue: string;
    currentlySearch: string;
    prevSearchNames: string[];
    showFilters: boolean;
    showSearchHistory: boolean;
    filterOutLists: string[];
}

export interface ItemProps {
    item: ItemType;
}

export interface ItemType {
    id: number;
    title: string;
    provide: string;
    image: string;
};

export interface ListProps {
    list: ListType;
}

export interface ListType{
    id: number;
    title: string;
    items: ItemType[];
};

export interface CategoryStates {
    category: CategoryType;
    filtedLists: ListType[];
}

export interface CategoryType {
    title: string;
    description: string;
    lists: ListType[];
};

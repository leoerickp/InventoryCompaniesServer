export interface inputNewItem {
    itemName: string;
    amount: number;
    NIT: string;
}

type partialItem = Partial<inputNewItem>

export interface inputUpdatedItem extends partialItem { }

export interface IItem extends inputNewItem {
    id: string;
}
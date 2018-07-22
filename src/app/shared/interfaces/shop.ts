import { Rpg, Item } from "./";

export interface Shop {
    id: number,
    rpg_id: number,
    name: string,
    is_multiple_sale: boolean,
    rpg?: Rpg;
    items?: Item[],
    created_at: string,
    updated_at: string,
}
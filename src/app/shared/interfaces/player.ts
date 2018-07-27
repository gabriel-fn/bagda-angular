import { Rpg, User, Item } from "./";

export interface Player {
    id: number,
    user_id: number,
    rpg_id: number,
    image: string,
    detail: string,
    credential: number,
    gold: number,
    cash: number,
    rpg?: Rpg,
    user?: User,
    items?: Item[],
    requests?: Item[],
    process?: {units?: number, player_id: number, item_id: number},
    created_at: string,
    updated_at: string,
}
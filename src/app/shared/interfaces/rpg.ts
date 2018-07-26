import { Shop, User, Player } from "./";

export interface Rpg {
    id: number,
    user_id: number,
    image: string,
    name: string,
    master: User,
    gold_starter: number,
    cash_starter: number,
    is_public: boolean,
    shops?: Shop[],
    users?: User[],
    player?: Player,
    players?: Player[],
    created_at: string,
    updated_at: string,
}
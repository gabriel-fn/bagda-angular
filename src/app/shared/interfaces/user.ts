import { Rpg, Player } from "./";

export interface User {
    id: number,
    name: string,
    email: string,
    authority: number,
    rpgs?: Rpg[],
    my_rpgs?: Rpg[],
    player?: Player,
    players?: Player[],
    created_at: string,
    updated_at: string,
}
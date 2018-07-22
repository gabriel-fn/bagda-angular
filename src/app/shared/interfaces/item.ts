import { Shop, Player } from "./";

export interface Item {
    id: number,
    shop_id: number,
    image: string,
    name: string,
    detail: string,
    max_units: number,
    gold_price: number,
    cash_price: number,
    require_test: boolean,
    make_new: boolean,
    shop?: Shop,
    players?: Player[],
    process?: {units: number, status: boolean},
    created_at: string,
    updated_at: string,
}
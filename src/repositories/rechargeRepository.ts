import { connection } from "../../database";

export interface Recharge {
  id: number;
  cardId: number;
  timestamp: Date;
  amount: number;
}
export interface SumRecharge {
  cardId: number;
  amount: number;
}
export type RechargeInsertData = Omit<Recharge, "id" | "timestamp">;

export async function findByCardId(cardId: number) {
  const result = await connection.query<Recharge, [number]>(
    `SELECT * FROM recharges WHERE "cardId"=$1`,
    [cardId]
  );

  return result.rows;
}

export async function getSumRecharges(cardId: number) {
  const result = await connection.query<SumRecharge, [number]>(
    `SELECT "cardId", sum(amount) 
      FROM recharges 
      WHERE "cardId"=$1
      GROUP BY "cardId"`,
    [cardId]
  );

  return result.rows[0];
}

export async function insert(rechargeData: RechargeInsertData) {
  const { cardId, amount } = rechargeData;

  connection.query<any, [number, number]>(
    `INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`,
    [cardId, amount]
  );
}

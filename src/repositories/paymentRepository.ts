import { connection } from "../../database";

export interface Payment {
  id: number;
  cardId: number;
  businessId: number;
  timestamp: Date;
  amount: number;
}
export interface SumPayment {
  cardId: number;
  amount: number;
}
export type PaymentWithBusinessName = Payment & { businessName: string };
export type PaymentInsertData = Omit<Payment, "id" | "timestamp">;

export async function findByCardId(cardId: number) {
  const result = await connection.query<PaymentWithBusinessName, [number]>(
    `SELECT 
      payments.*,
      businesses.name as "businessName"
     FROM payments 
      JOIN businesses ON businesses.id=payments."businessId"
     WHERE "cardId"=$1
    `,
    [cardId]
  );

  return result.rows;
}

export async function getSumPayments(cardId: number) {
  const result = await connection.query<SumPayment,[number]>(
    `
    SELECT 
		"cardId",
     	sum(amount)
     FROM payments 
      JOIN businesses ON businesses.id=payments."businessId"
	 WHERE "cardId"=$1
	 GROUP BY "cardId"
`,
[cardId]
  )
  return result.rows[0];
}

export async function insert(paymentData: PaymentInsertData) {
  const { cardId, businessId, amount } = paymentData;

  connection.query<any, [number, number, number]>(
    `INSERT INTO payments ("cardId", "businessId", amount) VALUES ($1, $2, $3)`,
    [cardId, businessId, amount]
  );
}

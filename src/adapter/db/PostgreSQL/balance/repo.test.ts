import { Pool } from "pg";
import BalanceRepo from "./repo";
import Balance from "./type";

jest.mock("pg", () => {
  const mPool = {
    query: jest.fn()
  };
  return { Pool: jest.fn(() => mPool) };
});

describe("BalanceRepo", () => {
  let pool: Pool;
  let repo: BalanceRepo;

  beforeEach(() => {
    pool = new Pool();
    repo = new BalanceRepo(pool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getBalanceByUserId", () => {
    it("should return balance for a given userId", async () => {
      const userId = 1;
      const balance: Balance = { user_id: userId, balance: 100, currency: "USD" };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [balance] });

      const result = await repo.getBalanceByUserId(userId);

      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM balance WHERE user_id = $1', [userId]);
      expect(result).toEqual(balance);
    });
  });

  describe("updateBalanceByUserId", () => {
    it("should update and return updated balance for a given userId", async () => {
      const userId = 1;
      const newBalance = 200;
      const updatedBalance: Balance = { user_id: userId, balance: newBalance, currency: "USD" };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [updatedBalance] });

      const result = await repo.updateBalanceByUserId(userId, newBalance);

      expect(pool.query).toHaveBeenCalledWith('UPDATE balance SET balance = $1 WHERE user_id = $2', [newBalance, userId]);
      expect(result).toEqual(updatedBalance);
    });
  });

  describe("createBalance", () => {
    it("should create and return new balance", async () => {
      const userId = 1;
      const balanceAmount = 300;
      const currency = "EUR";
      const newBalance: Balance = { user_id: userId, balance: balanceAmount, currency };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [newBalance] });

      const result = await repo.createBalance(userId, balanceAmount, currency);

      expect(pool.query).toHaveBeenCalledWith(
        'INSERT INTO balance (user_id, balance, currency) VALUES ($1, $2, $3)',
        [userId, balanceAmount, currency]
      );
      expect(result).toEqual(newBalance);
    });
  });

  describe("deleteBalanceByUserId", () => {
    it("should delete balance for a given userId", async () => {
      const userId = 1;
      (pool.query as jest.Mock).mockResolvedValueOnce({});

      await repo.deleteBalanceByUserId(userId);

      expect(pool.query).toHaveBeenCalledWith('DELETE FROM balance WHERE user_id = $1', [userId]);
    });
  });
});

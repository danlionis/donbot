export abstract class Provider {
  public abstract async get<T>(key: string, defaultValue: T): Promise<T>;
  public abstract async has(key: string): Promise<boolean>;

  public abstract async delete<T>(key: string): Promise<T>;

  public abstract async set<T>(key: string, value: T): Promise<T>;
}

// nanoidの代替実装
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export class OmikujiId {
  private constructor(private readonly value: string) {}

  static create(value?: string): OmikujiId {
    const id = value || generateId();
    if (!id || id.trim().length === 0) {
      throw new Error('OmikujiId cannot be empty');
    }
    return new OmikujiId(id);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: OmikujiId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
} 
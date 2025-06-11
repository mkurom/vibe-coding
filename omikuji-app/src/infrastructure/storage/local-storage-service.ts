export class LocalStorageService {
  static isAvailable(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      const testKey = '__localStorage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  static setItem<T>(key: string, value: T): void {
    if (!this.isAvailable()) {
      return;
    }
    
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  static getItem<T>(key: string): T | null {
    if (!this.isAvailable()) {
      return null;
    }
    
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    if (!this.isAvailable()) {
      return;
    }
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  }

  static clear(): void {
    if (!this.isAvailable()) {
      return;
    }
    
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
} 
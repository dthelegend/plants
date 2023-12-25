import Dexie, { Table } from 'dexie';

export interface Plant {
    id?: number,
    name: string,
    last_watered: Date
    water_schedule: number
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  plants!: Table<Plant>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      plants: '++id, name, last_watered, water_schedule' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();

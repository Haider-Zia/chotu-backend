export type RelationKey<Entity> = {
  [Key in keyof Entity]: Entity[Key] extends Array<any> | object ? Key : never;
}[keyof Entity];

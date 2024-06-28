import { RelationKey } from 'src/common/types/relationsKeys.type';
import { camelCase } from './camelCase';

export const buildNestedJoinsRelationsArray = <Entity>({
  entity,
  relations,
}: {
  entity: { name: string };
  relations: RelationKey<Entity>[];
}): string[] => {
  let nestedRelations = [camelCase(entity.name)];
  for (const relation of relations) {
    nestedRelations = [
      ...nestedRelations,
      `${camelCase(entity.name)}.${String(relation)}`,
    ];
  }
  return nestedRelations;
};

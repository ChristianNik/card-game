import { entities, Entity, TEnities } from "../config/entities";
import { TRecepies } from "../config/recepies";

function getCraftable(ingreds: Partial<{ [key in TEnities]: number }>): keyof TRecepies | null {
	const ingredientCount = Object.values(ingreds).reduce((acc, value) => acc + value, 0);

	const match = Object.keys(entities).find(key => {
		const item: Entity = entities[key];

		if (!item.recepie) return null;

		const requiredIngredientCount = Object.values(item.recepie.ingredients).reduce(
			(acc, { count }) => acc + count,
			0
		);

		const sameLength = ingredientCount == requiredIngredientCount;

		if (!sameLength) return null;

		return item.recepie.ingredients.every(i => ingreds[i.name] - i.count == 0);
	});

	return (match as keyof TRecepies) || null;
}

export { getCraftable };

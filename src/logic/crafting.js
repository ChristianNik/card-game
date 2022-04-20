import { cardTypes } from "../constants/entities";

function getCraftable(ingreds = {}) {
	const ingredientCount = Object.values(ingreds).reduce((acc, value) => acc + value, 0);

	const match = Object.keys(cardTypes).find(key => {
		const item = cardTypes[key];
		if (!item.recepie) return;

		const requiredIngredientCount = Object.values(item.recepie.ingredients).reduce(
			(acc, { count }) => acc + count,
			0
		);

		const sameLength = ingredientCount == requiredIngredientCount;

		if (!sameLength) return false;

		return item.recepie.ingredients.every(i => {
			return ingreds[i.name] - i.count == 0;
		});
	});

	return match;
}

function getRecepieEntity(name) {
	return cardTypes[name];
}

export { getCraftable, getRecepieEntity };

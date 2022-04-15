import { cardTypes } from "../constants/card-types";

function getCraftable(ingreds = []) {
	const match = Object.keys(cardTypes).find(key => {
		const item = cardTypes[key];
		if (!item.recepie) return;

		const sameLength = ingreds.length == item.recepie.length;
		if (!sameLength) return false;

		return ingreds.every(ingred => {
			return item.recepie.indexOf(ingred) > -1;
		});
	});

	return match;
}

export { getCraftable };

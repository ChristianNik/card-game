const cardCategory = {
	foot: "foot",
	person: "person",
	enemy: "enemy",
	ingredient: "ingredient",
	recource: "recource",
	test: "test",
	default: "default"
};

type TCategory = keyof typeof cardCategory;
interface EntityCategoryArgs {
	color: string;
	bg1: string;
	bg2: string;
}

class EntityCategory {
	name: TCategory;
	args: EntityCategoryArgs;
	constructor({ category, textColor, primaryColor, accentColor }) {
		this.name = category;
		this.args = {
			color: textColor,
			bg1: accentColor,
			bg2: primaryColor
		};
	}
}

const categories = {
	ingredient: new EntityCategory({
		category: cardCategory.ingredient,
		textColor: "#fff",
		primaryColor: "#9CA2AE",
		accentColor: "#677284"
	}),
	person: new EntityCategory({
		category: cardCategory.person,
		textColor: "#000",
		primaryColor: "#FEF08A",
		accentColor: "#FEF9C3"
	}),
	recource: new EntityCategory({
		category: cardCategory.recource,
		textColor: "#fff",
		primaryColor: "#61605B",
		accentColor: "#42413C"
	}),
	default: new EntityCategory({
		category: cardCategory.default,
		textColor: "#fff",
		primaryColor: "#61605B",
		accentColor: "#43423D"
	})
};

export { EntityCategory, categories, cardCategory };
export type { TCategory, EntityCategoryArgs };

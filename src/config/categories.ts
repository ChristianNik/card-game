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
		category: "ingredient",
		textColor: "#fff",
		primaryColor: "#9CA2AE",
		accentColor: "#677284"
	}),
	person: new EntityCategory({
		category: "person",
		textColor: "#000",
		primaryColor: "#FEF08A",
		accentColor: "#FEF9C3"
	}),
	recource: new EntityCategory({
		category: "recource",
		textColor: "#fff",
		primaryColor: "#61605B",
		accentColor: "#42413C"
	}),
	fallback: new EntityCategory({
		category: "fallback",
		textColor: "#fff",
		primaryColor: "#61605B",
		accentColor: "#43423D"
	})
};

type TCategory = keyof typeof categories;

export { EntityCategory, categories };
export type { TCategory, EntityCategoryArgs };

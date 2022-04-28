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
		primaryColor: "hsl(220, 10%, 65%)",
		accentColor: "hsl(217, 12%, 46%)"
	}),
	person: new EntityCategory({
		category: "person",
		textColor: "#000",
		primaryColor: "hsl(53, 98%, 77%)",
		accentColor: "hsl(55, 97%, 88%)"
	}),
	recource: new EntityCategory({
		category: "recource",
		textColor: "#fff",
		primaryColor: "hsl(50, 3%, 37%)",
		accentColor: "hsl(50, 5%, 25%)"
	}),
	fallback: new EntityCategory({
		category: "fallback",
		textColor: "#fff",
		primaryColor: "hsl(50, 3%, 37%)",
		accentColor: "hsl(50, 5%, 25%)"
	})
};

type TCategory = keyof typeof categories;

export { EntityCategory, categories };
export type { TCategory, EntityCategoryArgs };

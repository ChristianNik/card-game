import EntityCategory from "../classes/entity-category";

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
	building: new EntityCategory({
		category: "building",
		textColor: "#fff",
		primaryColor: "hsl(0, 50%, 61%)",
		accentColor: "hsl(0, 55%, 40%)"
	}),
	fallback: new EntityCategory({
		category: "fallback",
		textColor: "#fff",
		primaryColor: "hsl(50, 3%, 37%)",
		accentColor: "hsl(50, 5%, 25%)"
	})
};

type TCategory = keyof typeof categories;

export { categories };
export type { TCategory };

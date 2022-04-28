import { TCategory } from "../config/categories";

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

export default EntityCategory;

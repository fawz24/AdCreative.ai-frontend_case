import { CategoryEntry } from "../type";

export type CategoryListItemProps = {
  category: CategoryEntry;
  selectCategory: (category: CategoryEntry) => void;
  deselectCategory: (category: CategoryEntry) => void;
  isSelected?: boolean;
};

export const CategoryListItem = ({
  category,
  selectCategory,
  deselectCategory,
  isSelected,
}: CategoryListItemProps) => {
  const { id, category: categoryName } = category;
  return (
    <li>
      <label className="flex gap-4 items-center">
        <input
          type="checkbox"
          name="category"
          value={id}
          onChange={(e) => {
            if (e.target.checked) {
              selectCategory(category);
            } else {
              deselectCategory(category);
            }
          }}
          className="peer appearance-none flex justify-center items-center w-4 h-4 border border-[#b3b2af] bg-white checked:before:block checked:before:w-2 checked:before:h-2 checked:before:bg-[#254cc6]"
          checked={isSelected}
        />
        <span className="peer-checked:text-[#274dc8]">{categoryName}</span>
      </label>
    </li>
  );
};

import { CategoryEntry } from "../type";

export type CategoryItemProps = {
  category: CategoryEntry;
  selectCategory: (category: CategoryEntry) => void;
  deselectCategory: (category: CategoryEntry) => void;
  isSelected?: boolean;
};

export const CategoryItem = ({
  category,
  selectCategory,
  deselectCategory,
  isSelected,
}: CategoryItemProps) => {
  const { id, category: categoryName } = category;
  return (
    <label className="flex gap-4 items-center group">
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
        className="peer appearance-none flex justify-center items-center w-4 h-4 border border-[#b3b2af] group-hover:border-[#6d6d6c] bg-white checked:before:block checked:before:w-2 checked:before:h-2 checked:before:bg-[#254cc6] group-hover:checked:before:bg-[#3662e6] group-focus-within:checked:before:bg-[#3662e6]"
        checked={isSelected}
      />
      <span className="text-gray-3 group-hover:text-[#2c2b2b] group-focus-within:text-[#2c2b2b] peer-checked:text-[#274dc8] group-hover:peer-checked:text-[#5074ea] group-focus-within:peer-checked:text-[#5074ea]">
        {categoryName}
      </span>
    </label>
  );
};

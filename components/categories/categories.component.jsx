import CategoryItem from "../category-item/category-item.component";
import "./categories.styles.scss";

const Categories = ({ categories }) => {
  // const { id, category } = categories;

  return (
    <div className="categories">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;

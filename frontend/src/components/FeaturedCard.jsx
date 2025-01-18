import { useEffect, useState } from "react";
import { FaUserFriends, FaClock, FaHeart } from "react-icons/fa";
import { apiStart } from "../../api";
import axios from "axios";
import ViewRecipe from "./ViewRecipe";

const FeaturedCard = () => {
  const categoryStyles = {
    Entrees: { backgroundColor: "#f0f5c4", color: "#59871f" },
    Breakfast: { backgroundColor: "#efedfa", color: "#3c3a8f" },
    Lunch: { backgroundColor: "#e5f7f3", color: "#1f8787" },
    Desserts: { backgroundColor: "#e8f5fa", color: "#397a9e" },
    Sides: { backgroundColor: "#feefc9", color: "#d16400" },
    Drinks: { backgroundColor: "#ffeae3", color: "#f0493e" },
    default: { backgroundColor: "#fff", color: "#000" },
  };
  const [recipe, setRecipe] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getCategoryStyle = (category) => {
    return categoryStyles[category] || categoryStyles.default;
  };

  const categoryStyle = getCategoryStyle(recipe.category);

  useEffect(() => {
    const fetchMostLikedRecipe = async () => {
      try {
        const response = await axios.get(
          `${apiStart}/api/recipe/mostLikedRecipe`
        );

        console.log(response.data);
        if (response.data.success) {
          setRecipe(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching most liked recipe:", error);
      }
    };

    fetchMostLikedRecipe();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mb-20 mt-12">
      <h2 className="text-4xl text-[#2A3342] font-bold mb-6">Top-Rated</h2>

      <div className="bg-orange-50 text-fuchsia-500 rounded-lg overflow-hidden shadow-lg grid grid-cols-[0.4fr_1fr]">
        <div className="relative">
          <img
            src={recipe?.photo}
            alt={recipe?.name}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full font-medium`}
            style={{
              backgroundColor: categoryStyle.backgroundColor,
              color: categoryStyle.color,
            }}
          >
            {recipe?.category}
          </div>
        </div>
        <div className="p-6 flex flex-col">
          <div className="pt-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-zinc-800">
                {recipe?.name}
              </h2>
              <p className="text-gray-600 mb-4 opacity-80">
                {recipe?.instructions}
              </p>
              <div className="flex justify-between items-center text-sm mb-4">
                <div className="flex items-center">
                  <FaUserFriends className="w-5 h-5 mr-2" />
                  <span>For up to {recipe?.servings} guests</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="w-5 h-5 mr-2" />
                  <span>
                    Prep: {recipe?.prepTime}, Cook: {recipe?.cookTime}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-sm justify-between">
                <div className="flex gap-2">
                  <FaHeart className="w-5 h-5 mr-2 text-red-500" />
                  <span>{recipe?.recipeLikeCount} likes</span>
                </div>

                <div className="flex gap-3">
                  {recipe?.tags?.map((tag) => (
                    <spans
                      key={tag}
                      className="py-2 px-4 font-medium text-sm rounded-full shadow-md hover:shadow-lg transition duration-300 bg-[#f0f5c4] text-[#871f85]"
                    >
                      {tag}
                    </spans>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-fuchsia-500 border-opacity-20">
            <div className="flex justify-between items-center">
              <span className="text-sm">Difficulty: {recipe?.difficulty}</span>
              <button
                className="px-4 py-2 font-semibold text-sm rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-slate-100"
                onClick={openModal}
              >
                View Recipe
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ViewRecipe
          onClose={closeModal}
          recipeId={recipe._id}
          isOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default FeaturedCard;

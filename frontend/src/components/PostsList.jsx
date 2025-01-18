import React, { useEffect, useState } from "react";
import { apiStart } from "../../api";
import { useAuth } from "../contexts/AuthContext";
import Postcard from "./Postcard";
import axios from "axios";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const { userObj } = useAuth();
  useEffect(() => {
    async function getUserPosts() {
      try {
        console.log(userObj._id);
        const response = await axios.post(
          `${apiStart}/api/recipe/userRecipes`,
          { createdBy: userObj?._id }
        );
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserPosts();
  }, []);
  //const examples = [
  //   {
  //     id: 1,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1560180474-e8563fd75bab?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     likesCount: 150,
  //     caption: "Lemon CheeseCake Tarts!",
  //   },
  //   {
  //     id: 2,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1564305571106-6361c07e026c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     likesCount: 200,
  //     caption: "Fresh Peach Cake!",
  //   },
  //   {
  //     id: 3,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1521309839925-a1a972e912ba?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     likesCount: 100,
  //     caption: "Blueberry Oatmeal",
  //   },
  //   {
  //     id: 3,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1521309839925-a1a972e912ba?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     likesCount: 100,
  //     caption: "Blueberry Oatmeal",
  //   },
  // ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-2">Added Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => {
          if (post.comments.length > 0) console.log(post);
          //console.log(post);
          return (
            <Postcard
              key={post._id}
              recipeID={post._id}
              imageUrl={post.photo}
              likesCount={post.recipeLikeCount}
              caption={post.name}
              preptime={post.prepTime}
              category={post.category}
              servings={post.servings}
              cooktime={post.cookTime}
              difficulty={post.difficulty}
              instructions={post.instructions}
              comments={post.comments}
              tags={post.tags}
              ingredients={post.ingredients}
              createdBy={post.createdBy}
              likeArray={post.likedUsers}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostsList;

import User from "../model/usermodel.js";
import Post from "../model/postmodel.js";

class PostController {
  constructor() {}

  static async createPost(req, res) {
    try {
      const data = req.body;
      if (!data.text && !data.images && !data.background) {
        return res.status(400).json({
          message:
            "At least one of the text, images or background must have value",
        });
      }
      const post = new Post({
        user: req.userId,
        ...req.body,
      });

      await post.save();

      res.json(
        await post.populate("user", "firstName lastName userName profilPic")
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getPosts(req, res) {
    try {
      const pageNum = parseInt(req.query.pageNum);
      const pageLimit = parseInt(req.query.pageLimit);
      const options = {
        page: pageNum,
        limit: pageLimit,
      };

      const postAggregate = Post.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
            pipeline: [
              {
                $project: {
                  firstName: 1,
                  lastName: 1,
                  userName: 1,
                  profilPic: 1,
                },
              },
            ],
          },
        },
        { $sort: { createdAt: -1 } },
      ]);

      const posts = await Post.aggregatePaginate(postAggregate, options);
      return res.json((posts))
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
  static async getMyPosts(req, res) {
    try {
      const pageNum = parseInt(req.query.pageNum);
      const pageLimit = parseInt(req.query.pageLimit);
      const userName = req.body?.userName
      if(!userName) return res.status(404).json({message: "user not found!"})
      const user = await User.findOne({userName})
    if(!user) return res.status(401).json({message: "user not found"})
      const options = {
        page: pageNum,
        limit: pageLimit,
      };

      const postAggregate = Post.aggregate([
        {
          $match : {user: user._id}
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
            pipeline: [
              {
                $project: {
                  firstName: 1,
                  lastName: 1,
                  userName: 1,
                  profilPic: 1,
                },
              },
            ],
          },
        },
        { $sort: { createdAt: -1 } },
      ]);

      const posts = await Post.aggregatePaginate(postAggregate, options);
      return res.json((posts))
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
}

export default PostController;

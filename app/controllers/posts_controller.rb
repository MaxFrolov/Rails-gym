class PostsController < ApiController

  def index
    posts = Post.all.page(params[:page]).per(params[:per])
    render_resources(posts)
  end

  def show
    post = Post.find_by(id: params[:id])
    render_resource_data(post)
  end

  def create
    @post.save
    render_resource_or_errors(@post)
  end

  def update
    @post.update(post_params)
    render_resource_or_errors(@post)
  end

  def destroy
    @post.destroy
    render nothing: true
  end

  private

  def post_params
    params.allow_empty_require(:resource).permit(:picture_url, :header, :short_description, :news, :news_date)
  end
end

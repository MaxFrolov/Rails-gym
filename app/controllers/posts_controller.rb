class PostsController < ApiController
  load_resource

  def index
    params[:category_id].blank? ?
      @posts = @posts.ransack(q: 'created_at desc').result :
       @posts = @posts.joins(:categories).where(categories: { id: params[:category_id] })
    @posts = @posts.includes(:comments, :likes, :categories)

    render_resources @posts.page(params[:page]).per(params[:per])
  end

  def show
    render_resource_data(@post)
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

  def recommended_posts
    @posts = @posts.sample(params[:count].to_f)
    render_resources @posts
  end

  private

  def post_params
    params.allow_empty_require(:resource).permit(:title, :subtitle, :description, :post_category, :count)
  end
end

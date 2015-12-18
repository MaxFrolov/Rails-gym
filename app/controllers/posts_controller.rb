class PostsController < ApiController
  load_resource

  def index
    params[:category] ?
    @posts = @posts.where(post_category: params[:category]).page(params[:page]).per(params[:per]) :
        @posts = @posts.ransack(q: params[:sort] || 'created_at desc').result.page(params[:page]).per(params[:per])

    render_resources @posts
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

  private

  def post_params
    params.allow_empty_require(:resource).permit(:picture_url, :header, :short_description, :news, :news_date, :post_category)
  end
end

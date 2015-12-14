class BlogsController < ApiController

  def index
    posts = Blog.all.page(params[:page]).per(params[:per])
    render_resources(posts)
  end

  def create
    @blog.save
    render_resource_or_errors(@blog)
  end

  def update
    @blog.update(blog_params)
    render_resource_or_errors(@blog)
  end

  def destroy
    @blog.destroy
    render nothing: true
  end

  private

  def blog_params
    params.allow_empty_require(:resource).permit(:picture_url, :header, :short_description, :news, :news_date)
  end
end

class CommentsController < ApiController
  def index
    comments = Comment.where(post_id: params[:post_id]).includes(:user)
    render_resources(comments)
  end

  def show
    comment = Comment.find_by(id: params[:id])
    render_resource_data(comment)
  end

  def create
    @comments.save
    render_resource_or_errors(@comments)
  end

  def update
    @comments.update(comments_params)
    render_resource_or_errors(@comments)
  end

  def destroy
    @comments.destroy
    render nothing: true
  end

  private

  def comments_params
    params.allow_empty_require(:resource).permit(:message, :comment_date, :user_id, :post_id)
  end
end

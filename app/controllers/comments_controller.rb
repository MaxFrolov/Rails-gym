class CommentsController < ApiController
  before_action :load_target
  load_and_authorize_resource through: :target

  def index
    @comments = @comments.includes(:user, :likes)
    render_resources @comments
  end

  def create
    @comment.save
    render_resource_or_errors @comment
  end

  def update
    @comment.update(comment_params)
    render_resource_or_errors @comment
  end

  def destroy
    @comment.destroy
    render nothing: true
  end

  private

  def load_target
    unless Comment::TARGETS.include? params[:target_type].camelize
      raise ::ParamError::NotAcceptableValue.new(:target_type, params[:target_type], Comment::TARGETS)
    end

    @target = params[:target_type].camelize.constantize.find(params[:target_id])
  end

  def comment_params
    params.require(:resource).permit(:name, :email, :message)
  end
end

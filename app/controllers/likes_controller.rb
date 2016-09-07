class LikesController < ApiController
  before_action :load_target, only: :create
  load_and_authorize_resource through: :target, only: :create
  load_resource only: :destroy

  def index
    @likes = @likes.includes(:target, :user)
    render_resources @likes
  end

  def create
    @like.save
    render_resource_or_errors @like
  end

  def destroy
    @like.destroy

    render nothing: true
  end

  private

  def load_target
    params.require(:resource).permit(:target_type, :target_id).tap do |data|
      unless Like::TARGETS.include? data[:target_type].camelize
        raise ::ParamError::NotAcceptableValue.new(:target_type, data[:target_type], Like::TARGETS)
      end

      @target = data[:target_type].camelize.constantize.find(data[:target_id])
    end
  end
end

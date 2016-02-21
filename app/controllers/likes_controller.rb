class LikesController < ApplicationController
  before_action :load_target, only: :create

  load_resource through: :target, only: :create
  load_resource through: :user, only: :destroy

  def index
    likes = @user.likes.includes(:target).by_types(params[:types]).latest.page(params[:page])
                .per(params[:per_page]).padding(params[:padding])
    Like.preload(likes)

    render_resources likes, include_target: true
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
    params.require(:resource).permit(:type, :id).tap do |data|
      unless Like::TARGETS.include? data[:type]
        raise ::ParamError::NotAcceptableValue.new(:type, data[:type], Like::TARGETS)
      end

      @target = Like.load_target(data[:type], data[:id])
    end
  end
end

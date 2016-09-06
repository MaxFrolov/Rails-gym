class WorkoutsController < ApiController
  load_resource

  def index
    @workouts = @workouts.where(level: params[:level]) unless params[:level].blank?
    @workouts = @workouts.joins(:categories).where(categories: { id: params[:category_id] }) unless params[:category_id].blank?
    render_resources(@workouts.page(params[:page]).per(params[:per]).includes(:categories))
  end

  def show
    render_resources(@workouts)
  end
end

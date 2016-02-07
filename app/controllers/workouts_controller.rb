class WorkoutsController < ApplicationController
  load_resource

  def index
    @workouts = @workouts.where(category: params[:category])
    render_resource_or_errors(@workouts)
  end

  def workout_params
    params.allow_empty_require(:resource).permit(:image, :header, :short_description, :workout_description, :category)
  end
end

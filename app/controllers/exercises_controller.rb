class ExercisesController < ApiController
  load_resource

  def index
    @exercises = @exercises.where(workout_id: params[:id])
    render_resources(@exercises)
  end

  def show
    render_resource_data(@exercise)
  end
end
